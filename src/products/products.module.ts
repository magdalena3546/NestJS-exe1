import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsDataService } from './products-data.service';
import { TagRepository } from './db/tag.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './db/products.entity';
import { ProductRepository } from './db/product.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsDataService, TagRepository, ProductRepository],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductsModule {}
