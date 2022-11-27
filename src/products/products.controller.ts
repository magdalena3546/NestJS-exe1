import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  HttpCode,
  Put,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { dateToArray } from 'src/shared/helpers/date.helpers';
import { Product } from './db/products.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { ExternalProductDto } from './dto/external-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { ProductsDataService } from './products-data.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsDataService) {}
  @Get(':id')
  async getProductById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productService.getProductById(id),
    );
  }

  @Get()
  async getAllProducts(): Promise<ExternalProductDto[]> {
    return (await this.productService.getAllProducts()).map((i) =>
      this.mapProductToExternal(i),
    );
  }

  @UseGuards(RoleGuard)
  @Post()
  async addProduct(
    @Body() item: CreateProductDTO,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productService.addProduct(item),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteProduct(@Param('id') _id_: string): Promise<void> {
    return await this.productService.deleteProduct(_id_);
  }

  @Put(':id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() product: UpdateProductDto,
  ): Promise<ExternalProductDto> {
    return this.mapProductToExternal(
      await this.productService.updateProduct(id, product),
    );
  }

  mapProductToExternal(product: Product): ExternalProductDto {
    return {
      ...product,
      createdAt: dateToArray(product.createdAt),
      updatedAt: dateToArray(product.updatedAt),
      tags: product.tags?.map((i) => i.name),
    };
  }
}
