import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersDataService } from './users-data.service';
import { UserValidatorService } from './user-validator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './db/users.entity';
import { UserAddressRepository } from './db/user_address.repository';
import { UserRepository } from './db/user.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersDataService,
    UserValidatorService,
    UserAddressRepository,
    UserRepository,
  ],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
