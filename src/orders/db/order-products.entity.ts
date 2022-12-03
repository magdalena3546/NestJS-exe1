import { Product } from 'src/products/db/products.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Order } from './orders.entity';

@Entity({
  name: 'order_products',
})
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column({
    default: 0,
    type: 'float',
  })
  price: number;

  @Column({
    default: 1,
  })
  count: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Order, (order) => order.id, {
    onDelete: 'CASCADE',
  })
  order: Order;
}
