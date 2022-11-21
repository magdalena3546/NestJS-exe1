import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
} from 'class-validator';
import { Tags } from '../enums/tags.enum';

export class UpdateProductDto {
  @IsNotEmpty()
  @MaxLength(25)
  name: string;
  @IsNumber()
  @Min(0)
  price: number;
  @IsNumber()
  @Min(0)
  count: number;
  @IsArray()
  @IsEnum({ each: true })
  tags: Array<Tags>;
}
