import { Roles } from '../enums/roles.enum';

export interface UserAddressDto {
  country: string;
  city: string;
  streetName: string;
  buildingNumber: number;
  apartmentNumber?: number;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  birthday: Array<number>;
  address?: UserAddressDto;
  role: Roles;
}
