import { EntityAlreadyExists, EntityNotFound } from '../exceptions';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Order } from '../modules/order/interfaces/order.interface';

export class HttpResponse {
  static success(data: Order) {
    return {
      id: data.id.toString(),
      user: data.name,
      pump: data.pump,
      price: data.price,
      status: data.status,
    };
  }

  static throwHttpError(e) {
    const message = {
      message: e.message,
    };
    switch (e.constructor) {
      case EntityAlreadyExists:
        throw new HttpException(message, HttpStatus.CONFLICT);
      case EntityNotFound:
        throw new HttpException(message, HttpStatus.NOT_FOUND);
      default:
        Logger.error(e.message, e);
        throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
