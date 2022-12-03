import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { dateToArray } from 'src/shared/helpers/date.helpers';
import { Order } from './db/orders.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ExternalOrderDto } from './dto/external-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersDataService } from './orders-data.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersDataService) {}

  @Get(':id')
  async getOrderById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(await this.orderService.getOrderById(id));
  }

  @Get()
  getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Post()
  async addOrder(@Body() item: CreateOrderDto): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(await this.orderService.addOrder(item));
  }

  @Put(':id')
  async updateOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() order: UpdateOrderDto,
  ): Promise<ExternalOrderDto> {
    return this.mapOrderToExternal(
      await this.orderService.updateOrder(id, order),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOrder(@Param('id') id: string): Promise<void> {
    return await this.orderService.deleteOrder(id);
  }

  mapOrderToExternal(order: Order): ExternalOrderDto {
    const user = {
      firstName: order.user.firstName,
      lastName: order.user.lastName,
      email: order.user.email,
      address: order.user.address,
    };
    return {
      ...order,
      user: user,
      createdAt: dateToArray(order.createdAt),

      orderProducts: order.orderProducts.map((elm) => {
        return {
          orderProductId: elm.id,
          productId: elm.product.id,
          productName: elm.product.name,
          count: elm.product.count,
          price: elm.product.price,
        };
      }),
    };
  }
}
