import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://sarang-mongo:27017/orders', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
