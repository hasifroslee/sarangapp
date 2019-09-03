import { Model } from 'mongoose';
import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { InjectSchedule, Schedule } from 'nest-schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './interfaces/order.interface';
import { EntityAlreadyExists } from '../../exceptions';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './schemas/order.schema';
import { AxiosResponse } from 'axios';

enum PaymentStatus {
  CONFIRMED = 'CONFIRMED',
  DECLINED = 'DECLINED',
}

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectSchedule() private readonly schedule: Schedule,
    private readonly httpService: HttpService,
  ) {}

  async create(data: CreateOrderDto): Promise<Order> {
    const order = await new this.orderModel(data).save();
    this.createPaymentJob(order);
    return order;
  }

  async findById(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }

  async cancelById(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException();
    }
    order.status = OrderStatus.CANCELLED;
    return await order.save();
  }

  private async updateOrderStatusById(id: string, status: OrderStatus): Promise<Order> {
    return await this.orderModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  private createPaymentJob(order: Order) {
    this.schedule.scheduleTimeoutJob(
      `payment-job-${order.id}`,
      5000,
      () => {
        this.httpService
          .post('http://payment-service/payments', { ref: order.id })
          .subscribe(async (response: AxiosResponse) => {
            switch (response.data.status) {
              case PaymentStatus.CONFIRMED:
                order.status = OrderStatus.CONFIRMED;
                this.confirmDeliveryJob(order);
                break;
              case PaymentStatus.DECLINED:
                order.status = OrderStatus.CANCELLED;
                break;
              default:
                return false;
            }
            await this.updateOrderStatusById(order.id, order.status);
          });
        return true;
    });
  }

  private confirmDeliveryJob(order: Order) {
    this.schedule.scheduleTimeoutJob(
      `confirm-delivery-job-${order.id}`,
      5000,
      async () => {
        order.status = OrderStatus.DELIVERED;
        await this.updateOrderStatusById(order.id, order.status);
        return true;
      },
    );
  }
}
