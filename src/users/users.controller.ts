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
import { UsersDataService } from './users-data.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserValidatorService } from './user-validator.service';
import { User } from './db/users.entity';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersDataService,
    private userValidatorService: UserValidatorService,
  ) {}

  @Get(':id')
  async getUserById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
  ): Promise<ExternalUserDto> {
    return this.mapUserToExternal(await this.userService.getUserById(_id_));
  }

  @Get()
  async getAllUser(): Promise<ExternalUserDto[]> {
    return (await this.userService.getAllUsers()).map(this.mapUserToExternal);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') _id_: string): Promise<void> {
    return await this.userService.deleteUser(_id_);
  }

  @Post()
  async addUser(@Body() _item_: CreateUserDto): Promise<ExternalUserDto> {
    return this.mapUserToExternal(await this.userService.addUser(_item_));
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) _id_: string,
    @Body() _item_: UpdateUserDto,
  ): Promise<ExternalUserDto> {
    return this.mapUserToExternal(
      await this.userService.updateUser(_id_, _item_),
    );
  }

  mapUserToExternal(user: User): ExternalUserDto {
    return {
      ...user,
      birthday: dateToArray(user.birthday),
    };
  }
}
