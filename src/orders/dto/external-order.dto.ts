import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateNested,
  Min,
  IsEnum,
  IsDate,
  IsEmail,
} from 'class-validator';
import { CreateUserAddressDto } from 'src/users/dto/create-user.dto';
import { Statuses } from '../enums/statuses.enum';

export class ExternalOrderDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ValidateNested({ each: true })
  @Type(() => ExternalOrderProductDto)
  orderProducts: Array<ExternalOrderProductDto>;

  @ValidateNested({ each: true })
  @Type(() => ExternalUserDto)
  user: ExternalUserDto;

  @IsDate()
  createdAt: Array<number>;

  @IsEnum(Statuses)
  status: Statuses;

  @IsNumber()
  @Min(1)
  price: number;
}

export class ExternalOrderProductDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsUUID()
  orderProductId: string;

  @IsNotEmpty()
  productName: string;

  @IsNumber()
  @Min(1)
  count: number;

  @IsNumber()
  price: number;
}

export class ExternalUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ValidateNested({ each: true })
  @Type(() => CreateUserAddressDto)
  address: Array<CreateUserAddressDto>;
}
