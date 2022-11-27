import { Roles } from '../../shared/enums/roles.enum';

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserAddress } from './address.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 50 })
  email: string;

  @Column('enum', {
    enum: Roles,
  })
  role: Roles;

  @Column()
  birthday: Date;

  @OneToMany(() => UserAddress, (address) => address.user)
  address?: UserAddress[];
}
