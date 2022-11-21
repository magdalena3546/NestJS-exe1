import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { arrayToDate } from 'src/shared/helpers/date.helpers';
import { Roles } from '../../shared/enums/roles.enum';

export class UpdateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Transform((d) => arrayToDate(d))
  birthday: Date;

  @ValidateNested({ each: true })
  @Type(() => UpdateUserAddressDto)
  address?: Array<UpdateUserAddressDto>;

  @IsEnum(Roles)
  role: Roles;
}

export class UpdateUserAddressDto {
  @IsNotEmpty()
  country: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  street: string;
  @IsNotEmpty()
  @IsNumber()
  number: number;
}
