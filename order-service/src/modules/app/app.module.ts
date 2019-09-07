import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from '../order/order.module';
import { host, username, password, db } from '../../../configs/db.config';
import { isDev } from '../../../configs/app.config';

const mongoUri = isDev
  ? `mongodb://${host}/${db}`
  : `mongodb+srv://${username}:${password}@${host}/${db}?retryWrites=true&w=majority`;

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
