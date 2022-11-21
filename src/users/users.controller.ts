import {
  Controller,
  Get,
  Param,
  Delete,
  HttpCode,
  Body,
  Post,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { dateToArray } from 'src/shared/helpers/date.helpers';
import { ExternalUserDto } from './dto/external-user.dto';
import { User } from './interfaces/user.interface';
import { UsersDataService } from './users-data.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserValidatorService } from './user-validator.service';

@Controller('users')
export class UsersController {
  constructor(
    private userRepository: UsersDataService,
    private userValidatorService: UserValidatorService,
  ) {}

  @Get(':id')
  getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): ExternalUserDto {
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
    this.userValidatorService.validateUniqueEmail(_item_.email);
    return this.mapUserToExternal(this.userRepository.addUser(_item_));
  }

  @Put(':id')
  updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
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
