import { Injectable } from '@nestjs/common';
import { PaymentRequestDto } from './dto/payment.request.dto';
import { PaymentResponseDto } from './dto/payment.response.dto';

const PaymentStatus = ['CONFIRMED', 'DECLINED'];

@Injectable()
export class PaymentService {
  async processPayment(data: PaymentRequestDto): Promise<PaymentResponseDto> {
    return new Promise(resolve => {
      resolve({
        ref: data.ref,
        status:
          PaymentStatus[
            Math.floor(Math.random() * Object.keys(PaymentStatus).length)
          ],
      });
    });
  }
}
