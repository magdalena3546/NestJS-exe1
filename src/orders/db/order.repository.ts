import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Order } from './orders.entity';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }
}
