import { Roles } from '../../shared/enums/roles.enum';

export interface UserAddressDto {
  country: string;
  city: string;
  street: string;
  number: number;
}

export interface ExternalUserDto {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  birthday: Array<number>;
  address?: Array<UserAddressDto>;
  role: Roles;
}
