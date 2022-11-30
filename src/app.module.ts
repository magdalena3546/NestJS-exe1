import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import * as cors from 'cors';
import { TypeOrmModule } from '@nestjs/typeorm';
import config = require('./ormconfig');
import { dataSourceOptions } from './ormconfig';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
