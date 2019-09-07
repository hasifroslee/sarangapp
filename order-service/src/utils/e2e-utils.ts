import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as faker from 'faker';
import { CreateOrderDto } from '../modules/order/dto/create.order.dto';

/**
 * Create a new random order
 * @param app testModule app
 */
export const createOrder = async (app: INestApplication) => {
  const order: CreateOrderDto = {
    user: faker.random.uuid(),
    pump: faker.random.number(),
    price: faker.random.number(),
  };

  const response = await request(app.getHttpServer())
    .post('/orders')
    .set('Content-type', 'Application/json')
    .send(order);

  return response.body;
};

/**
 * Get an order by id
 * @param app testModule app
 * @param id of the order
 */
export const getOrderById = async (app: INestApplication, id: string) => {
  const response = await request(app.getHttpServer()).get(`/orders/${id}`);

  return response.body;
};

/**
 * Wait for ms of time before continuing execution
 * @param ms time in milliseconds
 */
export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
