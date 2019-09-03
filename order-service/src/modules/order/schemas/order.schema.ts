import * as mongoose from 'mongoose';

export enum OrderStatus {
  CREATED = 'CREATED',
  CONFIRMED = 'CONFIRMED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export const OrderSchema = new mongoose.Schema({
  user: { type: String, require: true },
  pump: { type: Number, require: true },
  price: { type: Number, require: true },
  status: { type: OrderStatus, default: OrderStatus.CREATED },
});
