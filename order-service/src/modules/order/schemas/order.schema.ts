import * as mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

export enum OrderStatus {
  CREATED = 'CREATED',
  CONFIRMED = 'CONFIRMED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export const OrderSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  user: { type: String, require: true },
  pump: { type: Number, require: true },
  price: { type: Number, require: true },
  status: { type: OrderStatus, default: OrderStatus.CREATED },
  createdAt: { type: Date, default: Date.now },
});
