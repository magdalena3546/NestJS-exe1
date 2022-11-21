import { Roles } from '../../shared/enums/roles.enum';

export interface UserAddress {
  country: string;
  city: string;
  street: string;
  number: number;
}

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: Date;
  address?: Array<UserAddress>;
  role: Roles;
}
