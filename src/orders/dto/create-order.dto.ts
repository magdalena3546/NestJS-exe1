import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsUUID,
  ValidateNested,
  Min,
} from 'class-validator';
import { Column } from 'typeorm';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductDto)
  orderProducts: Array<CreateOrderProductDto>;

  @IsNotEmpty()
  @IsUUID()
  addressId: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  addInfo: string;
}

export class CreateOrderProductDto {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNumber()
  @Min(1)
  count: number;
}
