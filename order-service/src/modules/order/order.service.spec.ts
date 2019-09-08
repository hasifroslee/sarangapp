import { Test, TestingModule } from '@nestjs/testing';
import { model } from 'mongoose';
import { OrderService } from './order.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/common';
import { ScheduleModule } from 'nest-schedule';
import { OrderSchema, OrderStatus } from './schemas/order.schema';
import mockingoose from 'mockingoose';
import { NotCancellable } from '../../exceptions';

describe('OrderService', () => {
  let service: OrderService;
  const orderModel = model('Order', OrderSchema);
  const mockOrder = {
    _id: '751d18a9-478c-4a54-8019-fdaaa07522e0',
    user: '2',
    pump: 7,
    price: 60,
    status: 'CREATED',
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ScheduleModule.register()],
      providers: [
        OrderService,
        {
          provide: getModelToken('Order'),
          useValue: orderModel,
        },
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(() => {
              return {
                subscribe: jest.fn().mockReturnThis(),
              };
            }),
          },
        },
      ],
    }).compile();

    service = app.get<OrderService>(OrderService);
  });

  describe('create', () => {
    it('should create an order', async () => {
      const createOrder = {
        user: '1',
        pump: 12,
        price: 40,
      };
      mockingoose(orderModel).toReturn({}, 'save');
      const result = await service.create(createOrder);
      expect(result).toMatchObject({
        _id: expect.anything(),
        user: '1',
        pump: 12,
        price: 40,
        status: 'CREATED',
      });
    });
  });

  describe('findById', () => {
    it('should return order with matching id', async () => {
      mockingoose(orderModel).toReturn(mockOrder, 'findOne');
      const result = await service.findById(mockOrder._id);
      expect(result).toMatchObject(mockOrder);
    });
  });

  describe('getAll', () => {
    it('should return a list of orders', async () => {
      mockingoose(orderModel).toReturn([mockOrder], 'find');
      const result = await service.getAll();
      expect(result).toMatchObject([mockOrder]);
    });
  });

  describe('cancelById', () => {
    it('should update status of order with matching id to CANCELLED', async () => {
      mockingoose(orderModel).toReturn(mockOrder, 'findOneAndUpdate');
      mockOrder.status = OrderStatus.CONFIRMED;
      mockingoose(orderModel).toReturn(mockOrder, 'save');
      const result = await service.cancelById(mockOrder._id);
      expect(result).toMatchObject(mockOrder);
    });

    it('should throw NotCancellable exception if order status is DELIVERED', async () => {
      mockingoose(orderModel).toReturn(mockOrder, 'findOneAndUpdate');
      mockOrder.status = OrderStatus.DELIVERED;
      mockingoose(orderModel).toReturn(mockOrder, 'save');
      await expect(service.cancelById(mockOrder._id)).rejects.toThrow(
        NotCancellable,
      );
    });
  });
});
