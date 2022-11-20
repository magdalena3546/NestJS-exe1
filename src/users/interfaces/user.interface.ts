import { Roles } from '../enums/roles.enum';

export interface UserAddress {
  country: string;
  city: string;
  streetName: string;
  buildingNumber: number;
  apartmentNumber?: number;
}

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: Date;
  address?: UserAddress;
  role: Roles;
}
