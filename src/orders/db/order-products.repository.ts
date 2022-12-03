import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { OrderProduct } from './order-products.entity';

@Injectable()
export class OrderProductRepository extends Repository<OrderProduct> {
  constructor(private dataSource: DataSource) {
    super(OrderProduct, dataSource.createEntityManager());
  }

  public async deleteProductOrderByOrderId(orderId: string): Promise<void> {
    const orderProducts = await this.find({
      where: {
        id: orderId,
      },
    });

    await this.remove(orderProducts);
  }
}
