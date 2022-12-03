import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateNested,
  Min,
  IsEnum,
} from 'class-validator';
import { Column } from 'typeorm';
import { Statuses } from '../enums/statuses.enum';

export class UpdateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ValidateNested({ each: true })
  @Type(() => UpdateOrderProductDto)
  orderProducts: Array<UpdateOrderProductDto>;

  @IsNotEmpty()
  @IsUUID()
  addressId: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  addInfo: string;

  @IsEnum(Statuses)
  status: Statuses;
}

export class UpdateOrderProductDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNumber()
  @Min(1)
  count: number;
}
