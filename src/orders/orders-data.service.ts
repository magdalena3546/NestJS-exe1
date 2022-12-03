import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/products/db/product.repository';
import { Product } from 'src/products/db/products.entity';
import { UserAddress } from 'src/users/db/address.entity';
import { User } from 'src/users/db/users.entity';
import { DataSource } from 'typeorm';
import { OrderProduct } from './db/order-products.entity';
import { OrderProductRepository } from './db/order-products.repository';
import { OrderRepository } from './db/order.repository';
import { Order } from './db/orders.entity';
import { CreateOrderDto, CreateOrderProductDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Statuses } from './enums/statuses.enum';

@Injectable()
export class OrdersDataService {
  constructor(
    private orderRepository: OrderRepository,
    private orderProductRepository: OrderProductRepository,
    private productRepository: ProductRepository,
    private dataSource: DataSource,
  ) {}

  async saveOrderProducts(
    productsArr: CreateOrderProductDto[],
  ): Promise<OrderProduct[]> {
    const orderProducts: OrderProduct[] = [];

    for (let i = 0; i < productsArr.length; i++) {
      const orderProduct = new OrderProduct();

      const productDb = await this.productRepository.findOneBy({
        id: productsArr[i].productId,
      });

      orderProduct.product = new Product();
      orderProduct.product.id = productDb.id;
      orderProduct.product.name = productDb.name;
      orderProduct.count = productDb.count;
      orderProduct.price = productDb.price * productDb.count;

      await this.orderProductRepository.save(orderProduct);
      orderProducts.push(orderProduct);
    }
    return orderProducts;
  }

  getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async addOrder(newOrder: CreateOrderDto): Promise<Order> {
    return this.dataSource.transaction(async () => {
      const orderToSave = new Order();

      orderToSave.user = new User();
      orderToSave.user.id = newOrder.userId;
      orderToSave.userAddress = new UserAddress();
      orderToSave.userAddress.id = newOrder.addressId;
      orderToSave.status = Statuses.NEW;
      orderToSave.orderProducts = await this.saveOrderProducts(
        newOrder.orderProducts,
      );
      orderToSave.addInfo = newOrder.addInfo;
      orderToSave.price = 0;

      orderToSave.orderProducts.forEach((elm) => {
        orderToSave.price += elm.price * elm.count;
        return orderToSave.price;
      });
      return await this.orderRepository.save(orderToSave);
    });
  }

  async updateOrder(id: string, order: UpdateOrderDto): Promise<Order> {
    return this.dataSource.transaction(async () => {
      const orderToUpdate = await this.getOrderById(id);
      await this.orderProductRepository.deleteProductOrderByOrderId(id);

      orderToUpdate.user = new User();
      orderToUpdate.user.id = order.userId;
      orderToUpdate.userAddress = new UserAddress();
      orderToUpdate.userAddress.id = order.addressId;
      orderToUpdate.status = Statuses.NEW;
      orderToUpdate.orderProducts = await this.saveOrderProducts(
        order.orderProducts,
      );
      orderToUpdate.addInfo = order.addInfo;
      orderToUpdate.price = 0;

      orderToUpdate.orderProducts.forEach((elm) => {
        orderToUpdate.price += elm.price * elm.count;
        return orderToUpdate.price;
      });
      return await this.orderRepository.save(orderToUpdate);
    });
  }

  getOrderById(id: string): Promise<Order> {
    return this.orderRepository.findOneBy({ id });
  }

  deleteOrder(id: string): void {
    this.orderRepository.delete(id);
  }
}
