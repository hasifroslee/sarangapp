import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/order.schema';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ScheduleModule } from 'nest-schedule';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    ScheduleModule.register(),
    HttpModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
