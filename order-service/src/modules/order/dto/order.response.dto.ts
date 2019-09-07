import { OrderStatus } from '../schemas/order.schema';

export class OrderResponseDto {
  id: string;
  user: string;
  pump: number;
  price: number;
  status: OrderStatus;
}
