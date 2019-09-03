import { Injectable } from '@nestjs/common';

const PaymentStatus = [
  'CONFIRMED',
  'DECLINED',
];

@Injectable()
export class PaymentService {
  async processPayment(data) {
    return new Promise((resolve) => {
      resolve({
        ref: data.ref,
        status: PaymentStatus[Math.floor(Math.random() * Object.keys(PaymentStatus).length)],
      });
    });
  }
}
