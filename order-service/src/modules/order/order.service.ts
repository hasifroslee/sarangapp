import { Model } from 'mongoose';
import { HttpService, Injectable } from '@nestjs/common';
import { InjectSchedule, Schedule } from 'nest-schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './interfaces/order.interface';
import { OrderStatus } from './schemas/order.schema';
import { AxiosResponse } from 'axios';
import { EntityNotFound } from '../../exceptions';
import { port, host } from '../../../configs/payment.config';
import { CreateOrderDto } from './dto/create.order.dto';

enum PaymentStatus {
  CONFIRMED = 'CONFIRMED',
  DECLINED = 'DECLINED',
}

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    private readonly httpService: HttpService,
    @InjectSchedule() private readonly schedule: Schedule,
  ) {}

  /**
   * Create a new order
   * @param createOrderDto params to create the order with
   */
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = new this.orderModel(createOrderDto);
    await order.save();
    this.createPaymentJob(order);
    return order;
  }

  /**
   * Find an order by id
   * Throw EntityNotFound if order does not exist
   * @param id of the order
   */
  async findById(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new EntityNotFound(`Order with id: ${id} does not exist`);
    }
    return order;
  }

  /**
   * Cancel an order by id
   * Sets status of the order to Cancelled if it is found
   * Throw EntityNotFound if order does not exist
   * @param id of the order
   */
  async cancelById(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new EntityNotFound(`Order with id: ${id} does not exist`);
    }
    order.status = OrderStatus.CANCELLED;
    return await order.save();
  }

  /**
   * Update the status of order with a matching id
   * @param id of the order
   * @param status to be updated to
   */
  private async updateOrderStatusById(
    id: string,
    status: OrderStatus,
  ): Promise<Order> {
    return await this.orderModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }

  /**
   * Call payment service to process order
   * @param order to be processed
   */
  private createPaymentJob(order: Order) {
    this.schedule.scheduleTimeoutJob(
      `create-payment-job-${order.id}`,
      2000,
      async () => {
        this.httpService
          .post(`http://${host}:${port}/payments`, {
            ref: order.id,
          })
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
      },
    );
  }

  /**
   * Schedule a one off job to update status of a Confirmed order to Delivered
   * @param order to be marked Delivered
   */
  private confirmDeliveryJob(order: Order) {
    if (order.status !== OrderStatus.CONFIRMED) {
      return;
    }
    this.schedule.scheduleTimeoutJob(
      `confirm-delivery-job-${order.id}`,
      2000,
      async () => {
        order.status = OrderStatus.DELIVERED;
        await this.updateOrderStatusById(order.id, order.status);
        return true;
      },
    );
  }
}
