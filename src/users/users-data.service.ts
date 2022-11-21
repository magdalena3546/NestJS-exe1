import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
// eslint-disable-next-line prettier/prettier
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersDataService {
  private users: Array<User> = [];

  addUser(newUser: CreateUserDto): User {
    const user: User = {
      ...newUser,
      id: uuidv4(),
    };
    this.users.push(user);
    return user;
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((i) => i.id !== id);
  }

  getAllUsers(): Array<User> {
    return this.users;
  }

  getUserById(id: string): User {
    return this.users.find((i) => i.id === id);
  }

  updateUser(id: string, dto: UpdateUserDto): User {
    this.users = this.users.map((i) => {
      if (i.id === id) {
        return {
          ...dto,
          id: i.id,
        };
      }
      return i;
    });

    return this.getUserById(id);
  }

  getUserByEmail(email: string): User {
    return this.users.find((i) => i.email === email);
  }
}
