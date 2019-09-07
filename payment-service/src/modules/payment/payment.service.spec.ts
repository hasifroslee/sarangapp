import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import * as faker from 'faker';

enum PaymentStatus {
  CONFIRMED = 'CONFIRMED',
  DECLINED = 'DECLINED',
}

describe('PaymentService', () => {
  let service: PaymentService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [PaymentService],
    }).compile();

    service = app.get<PaymentService>(PaymentService);
  });

  describe('processPayment', () => {
    it('should return with status CONFIRMED or DECLINED', async () => {
      const expected = {
        ref: faker.random.uuid(),
        confirmed: true,
        declined: true,
      };

      for (let i = 0; i < 10; i++) {
        const result = await service.processPayment({ ref: expected.ref });
        expect(result.ref).toBe(expected.ref);
        switch (result.status) {
          case PaymentStatus.CONFIRMED:
            expected.confirmed = false;
            break;
          default:
            expected.declined = false;
        }
      }

      expect(expected.declined).toBeFalsy();
      expect(expected.confirmed).toBeFalsy();
    });
  });
});
