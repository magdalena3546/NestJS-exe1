import { Injectable } from '@nestjs/common';
import { UserRepository } from './db/user.repository';
import { UserRequireUniqueEmailException } from './exception/user-require-unique-email-exception';

@Injectable()
export class UserValidatorService {
  constructor(private userRepository: UserRepository) {}
  validateUniqueEmail(email: string): void {
    if (this.userRepository.getUserByEmail(email)) {
      throw new UserRequireUniqueEmailException();
    }
  }
}
