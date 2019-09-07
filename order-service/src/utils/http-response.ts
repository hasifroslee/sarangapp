import { EntityAlreadyExists, EntityNotFound } from '../exceptions';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Order } from '../modules/order/interfaces/order.interface';
import { OrderResponseDto } from '../modules/order/dto/order.response.dto';

export class HttpResponse {
  static success(data: Order): OrderResponseDto {
    return {
      id: data.id,
      user: data.user,
      pump: data.pump,
      price: data.price,
      status: data.status,
    };
  }

  static throwHttpError(e) {
    switch (e.constructor) {
      case EntityAlreadyExists:
        throw new HttpException(e.message, HttpStatus.CONFLICT);
      case EntityNotFound:
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      default:
        Logger.error(e.message, e);
        throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
