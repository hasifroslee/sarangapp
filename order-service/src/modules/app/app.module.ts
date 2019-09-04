import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from '../order/order.module';
import { dbConfig } from '../../../configs';

@Module({
  imports: [
    MongooseModule.forRoot(
        dbConfig.uri,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
    ),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
