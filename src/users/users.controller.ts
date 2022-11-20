import {
  Controller,
  Get,
  Param,
  Delete,
  HttpCode,
  Body,
  Post,
  Put,
} from '@nestjs/common';
import { dateToArray } from 'src/shared/helpers/date.helpers';
import { ExternalUserDto } from './dto/external-user.dto';
import { User } from './interfaces/user.interface';
import { UsersDataService } from './users-data.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userRepository: UsersDataService) {}

  @Get(':id')
  getUserById(@Param('id') _id_: string): ExternalUserDto {
    return this.mapUserToExternal(this.userRepository.getUserById(_id_));
  }

  @Get()
  getAllUser(): Array<ExternalUserDto> {
    return this.userRepository.getAllUsers().map(this.mapUserToExternal);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') _id_: string): void {
    return this.userRepository.deleteUser(_id_);
  }

  @Post()
  addUser(@Body() _item_: CreateUserDto): ExternalUserDto {
    return this.mapUserToExternal(this.userRepository.addUser(_item_));
  }

  @Put(':id')
  updateUser(
    @Param('id') _id_: string,
    @Body() _item_: UpdateUserDto,
  ): ExternalUserDto {
    return this.mapUserToExternal(this.userRepository.updateUser(_id_, _item_));
  }

  mapUserToExternal(user: User): ExternalUserDto {
    return {
      ...user,
      birthday: dateToArray(user.birthday),
    };
  }
}
