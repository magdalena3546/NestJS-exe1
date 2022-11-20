import { Roles } from '../enums/roles.enum';

export interface UserAddressDto {
  country: string;
  city: string;
  streetName: string;
  buildingNumber: number;
  apartmentNumber?: number;
}

export interface UpdateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  birthday: Date;
  address?: UserAddressDto;
  role: Roles;
}
