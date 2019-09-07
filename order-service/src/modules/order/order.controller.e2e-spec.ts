import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app/app.module';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { CreateOrderDto } from './dto/create.order.dto';
import * as faker from 'faker';
import { createOrder, getOrderById, sleep } from '../../utils/e2e-utils';
import { Order } from './interfaces/order.interface';
import { OrderResponseDto } from './dto/order.response.dto';

describe('Orders', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  describe('/orders (POST)', () => {
    let createdOrder: Order;

    it('should create an order with status CREATED', async () => {
      const order: CreateOrderDto = {
        user: faker.random.word(),
        pump: faker.random.number(),
        price: faker.random.number(),
      };

      return request(app.getHttpServer())
        .post('/orders')
        .set('Content-type', 'Application/json')
        .send(order)
        .expect(200)
        .expect(response => {
          createdOrder = response.body;
          expect(createdOrder).toMatchObject(order);
          expect(createdOrder.id).toBeDefined();
          expect(createdOrder.status).toBe('CREATED');
        });
    });

    it('order status should transition to CONFIRMED or CANCELLED after 2000ms', async () => {
      await sleep(2100);
      const order: OrderResponseDto = await getOrderById(app, createdOrder.id);
      expect(order.status === 'CONFIRMED' || order.status === 'CANCELLED').toBe(
        true,
      );
    });

    it('order status should be in DELIVERED or CANCELLED after 4000ms', async () => {
      await sleep(4100);
      const order: OrderResponseDto = await getOrderById(app, createdOrder.id);
      expect(order.status === 'DELIVERED' || order.status === 'CANCELLED').toBe(
        true,
      );
    });
  });

  describe('/orders/:id (GET)', () => {
    it('should return an order if id exists', async () => {
      const original = await createOrder(app);

      return request(app.getHttpServer())
        .get(`/orders/${original.id}`)
        .expect(200)
        .expect(response => {
          const actual = response.body;
          expect(actual).toStrictEqual(original);
        });
    });

    it('should return 404 if id does not exist', async () => {
      return request(app.getHttpServer())
        .get(`/orders/${faker.random.uuid()}`)
        .expect(404);
    });
  });

  describe('/orders/:id/cancel (PUT)', () => {
    it('should set order status to CANCELLED', async () => {
      const original = await createOrder(app);

      return request(app.getHttpServer())
        .put(`/orders/${original.id}/cancel`)
        .expect(200)
        .expect(response => {
          const actual = response.body;
          expect(actual.status).toBe('CANCELLED');
        });
    });

    it('should return 404 if id does not exist', async () => {
      return request(app.getHttpServer())
        .get(`/orders/${faker.random.uuid()}/cancel`)
        .expect(404);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
