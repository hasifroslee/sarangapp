import { EntityAlreadyExists, EntityNotFound } from '../exceptions';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Order } from '../modules/order/interfaces/order.interface';

export class HttpResponse {
  static success(data: Order) {
    return {
      id: data.id.toString(),
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
