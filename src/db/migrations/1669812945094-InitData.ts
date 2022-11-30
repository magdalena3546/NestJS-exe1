import dataSource from 'src/ormconfig';
import { Product } from 'src/products/db/products.entity';
import { Tag } from 'src/products/db/tag.entity';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { faker } from '@faker-js/faker';
import { UserAddress } from 'src/users/db/address.entity';
import { User } from 'src/users/db/users.entity';

export class $InitData1669812945094 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tags = await this.saveTags();
    this.createProducts(tags);
    const addresses = await this.getUserAddress();
    await this.createUsers(addresses);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}

  private async saveTags(): Promise<Tag[]> {
    const tagsArr: Tag[] = [];
    const tags = [
      {
        name: 'NEW',
      },
      {
        name: 'PROMO',
      },
      {
        name: 'LAST_ITEMS',
      },
    ];

    for (const tag of tags) {
      const tagToSave = new Tag();
      tagToSave.name = tag.name;
      tagsArr.push(await dataSource.getRepository(Tag).save(tagToSave));
    }

    console.log('Tags saved');

    return tagsArr;
  }
  private async getRandomTags(tags: Tag[]): Promise<Tag[]> {
    const randomNum = Math.floor(Math.random() * tags.length);
    const arr: Tag[] = [];
    for (let i = 0; i < randomNum; i++) {
      const randomIndex = Math.floor(Math.random() * tags.length);
      const tag = tags[randomIndex];
      if (!arr.includes(tag)) {
        arr.push(tag);
      }
    }
    return arr;
  }

  private async createProducts(tags: Tag[]): Promise<void> {
    const productsArr: Product[] = [];

    for (let i = 0; i <= 100; i++) {
      const elm = {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.datatype.number(),
        count: faker.datatype.number(50),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        tags: await this.getRandomTags(tags),
        description: faker.commerce.productDescription(),
      };
      productsArr.push(elm);
    }
    await dataSource.getRepository(Product).save(productsArr);
    console.log('Products saved!');
  }

  private async getUserAddress(): Promise<UserAddress[]> {
    const arr: UserAddress[] = [];
    for (let i = 0; i < 5; i++) {
      const address = new UserAddress();
      address.id = faker.datatype.uuid();
      address.country = faker.address.country();
      address.city = faker.address.cityName();
      address.street = faker.address.street();
      address.number = faker.datatype.number();
      arr.push(await dataSource.getRepository(UserAddress).save(address));
    }
    console.log('Address saved!');
    return arr;
  }

  private async createUsers(addresses: UserAddress[]): Promise<void> {
    const usersArr = [];

    for (let i = 0; i < 500; i++) {
      const elm = {
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        birthday: faker.date.past(),
        role: 'ADMIN',
        address: addresses,
      };
      usersArr.push(elm);
    }
    await dataSource.getRepository(User).save(usersArr);
    console.log('User saved!');
  }
}
