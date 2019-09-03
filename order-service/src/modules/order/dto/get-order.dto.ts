import { OrderStatus } from '../schemas/order.schema';

export class GetOrderDto {
  id: string;
  user: string;
  pump: number;
  price: number;
  status: OrderStatus;
}