import { Injectable } from '@nestjs/common';
import { CreateProductDTO } from './dto/create-product.dto';
import { Product } from './interfaces/product.interface';
import { UpdateProductDto } from './dto/update-product.dto';
// eslint-disable-next-line prettier/prettier
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsDataService {
  private products: Array<Product> = [];

  addProduct(newProduct: CreateProductDTO): Product {
    const product: Product = {
      ...newProduct,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(product);
    return product;
  }

  deleteProduct(id: string): void {
    this.products = this.products.filter((i) => i.id !== id);
  }

  updateProduct(id: string, dto: UpdateProductDto): Product {
    this.products = this.products.map((i) => {
      if (i.id === id) {
        return {
          ...dto,
          id: i.id,
          createdAt: i.createdAt,
          updatedAt: new Date(),
        };
      }
      return i;
    });

    return this.getProductById(id);
  }

  getProductById(id: string): Product {
    return this.products.find((i) => i.id === id);
  }

  getAllProducts(): Array<Product> {
    return this.products;
  }
}
