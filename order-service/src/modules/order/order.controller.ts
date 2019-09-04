import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { HttpResponse } from '../../utils/http-response';
import { GetOrderDto } from './dto/get-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() body: CreateOrderDto): Promise<GetOrderDto> {
    try {
      const result = await this.orderService.create(body);
      return HttpResponse.success(result);
    } catch (e) {
      HttpResponse.throwHttpError(e);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<GetOrderDto> {
    try {
      const result = await this.orderService.findById(id);
      return HttpResponse.success(result);
    } catch (e) {
      HttpResponse.throwHttpError(e);
    }
  }

  @Put(':id/cancel')
  async cancelById(@Param('id') id: string): Promise<GetOrderDto> {
    try {
      const result = await this.orderService.cancelById(id);
      return HttpResponse.success(result);
    } catch (e) {
      HttpResponse.throwHttpError(e);
    }
  }
}
