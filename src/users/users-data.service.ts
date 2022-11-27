import { Injectable } from '@nestjs/common';
import { CreateUserAddressDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserAddressDto, UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './db/user.repository';
import { UserAddressRepository } from './db/user_address.repository';
import { User } from './db/users.entity';
import { UserAddress } from './db/address.entity';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';

@Injectable()
export class UsersDataService {
  constructor(
    private userRepository: UserRepository,
    private userAddressRepository: UserAddressRepository,
  ) {}

  async addUser(_user_: CreateUserDto): Promise<User> {
    if (await this.getUserByEmail(_user_.email)) {
      throw new UserRequireUniqueEmailException();
    }
    const userToSave = new User();
    userToSave.firstName = _user_.firstName;
    userToSave.lastName = _user_.lastName;
    userToSave.email = _user_.email;
    userToSave.birthday = _user_.birthday;
    userToSave.role = _user_.role;
    userToSave.address = await this.prepareUserAddressesToSave(_user_.address);
    return this.userRepository.save(userToSave);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async deleteUser(id: string): Promise<void> {
    this.userRepository.delete(id);
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.getUserById(id);
    await this.userAddressRepository.deleteUserAddressesByUserId(id);
    userToUpdate.firstName = dto.firstName;
    userToUpdate.lastName = dto.lastName;
    userToUpdate.birthday = dto.birthday;
    userToUpdate.role = dto.role;
    userToUpdate.email = dto.email;
    userToUpdate.address = await this.prepareUserAddressesToSave(dto.address);

    await this.userRepository.save(userToUpdate);
    return this.getUserById(id);
  }

  async prepareUserAddressesToSave(
    address: CreateUserAddressDto[] | UpdateUserAddressDto[],
  ): Promise<UserAddress[]> {
    const addresses: UserAddress[] = [];
    for (const add of address) {
      const addressToSave = new UserAddress();

      addressToSave.country = add.country;
      addressToSave.city = add.city;
      addressToSave.street = add.street;
      addressToSave.number = add.number;

      addresses.push(await this.userAddressRepository.save(addressToSave));
    }

    return addresses;
  }
}
