import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { HttpResponse } from '../../utils/http-response';
import { CreateOrderDto } from './dto/create.order.dto';
import { OrderResponseDto } from './dto/order.response.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() body: CreateOrderDto): Promise<OrderResponseDto> {
    try {
      const result = await this.orderService.create(body);
      return HttpResponse.success(result);
    } catch (e) {
      HttpResponse.throwHttpError(e);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<OrderResponseDto[]> {
    try {
      const result = await this.orderService.getAll();
      return HttpResponse.success(result);
    } catch (e) {
      HttpResponse.throwHttpError(e);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string): Promise<OrderResponseDto> {
    try {
      const result = await this.orderService.findById(id);
      return HttpResponse.success(result);
    } catch (e) {
      HttpResponse.throwHttpError(e);
    }
  }

  @Put(':id/cancel')
  @HttpCode(HttpStatus.OK)
  async cancelById(@Param('id') id: string): Promise<OrderResponseDto> {
    try {
      const result = await this.orderService.cancelById(id);
      return HttpResponse.success(result);
    } catch (e) {
      HttpResponse.throwHttpError(e);
    }
  }
}
