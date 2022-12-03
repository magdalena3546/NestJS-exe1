import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersDataService } from './orders-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProductRepository } from './db/order-products.repository';
import { OrderRepository } from './db/order.repository';
import { ProductRepository } from 'src/products/db/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository, OrderProductRepository]),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersDataService,
    OrderRepository,
    ProductRepository,
    OrderProductRepository,
  ],
})
export class OrdersModule {}
