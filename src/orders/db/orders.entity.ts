import { UserAddress } from 'src/users/db/address.entity';
import { User } from 'src/users/db/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Statuses } from '../enums/statuses.enum';
import { OrderProduct } from './order-products.entity';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    eager: true,
  })
  orderProducts: OrderProduct[];

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => UserAddress, (userAddress) => userAddress.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  userAddress: UserAddress;

  @Column({
    default: 0,
    type: 'float',
  })
  price: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  addInfo: string;

  @Column('enum', {
    enum: Statuses,
  })
  status: Statuses;
}
