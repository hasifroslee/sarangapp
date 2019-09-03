import { Document } from 'mongoose';
import { OrderStatus } from '../schemas/order.schema';

export interface Order extends Document {
  readonly id: string;
  readonly name: string;
  readonly pump: number;
  readonly price: number;
  status: OrderStatus;
}
