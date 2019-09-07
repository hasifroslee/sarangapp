import { EntityAlreadyExists, EntityNotFound } from '../exceptions';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Order } from '../modules/order/interfaces/order.interface';
import { OrderResponseDto } from '../modules/order/dto/order.response.dto';

export class HttpResponse {
  static success(data) {
    if (data.length) {
      return data.map(order => {
        return {
          id: order.id,
          user: order.user,
          pump: order.pump,
          price: order.price,
          status: order.status,
          createdAt: order.createdAt,
        };
      });
    }

    return {
      id: data.id,
      user: data.user,
      pump: data.pump,
      price: data.price,
      status: data.status,
      createdAt: data.createdAt,
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
