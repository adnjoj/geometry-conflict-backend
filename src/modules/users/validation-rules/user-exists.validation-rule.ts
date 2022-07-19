import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(value: string, args: ValidationArguments) {
    const user = await this.usersService.findOne({
      [args.property]: value,
    });

    if (!user) return false;
    return true;
  }

  defaultMessage() {
    return 'exceptions.UserDoesNotExist#{}';
  }
}
