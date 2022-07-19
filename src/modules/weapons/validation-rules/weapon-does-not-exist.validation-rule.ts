import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { WeaponExistsRule } from './weapon-exists.validation-rule';

@ValidatorConstraint({ name: 'WeaponDoesNotExist', async: true })
@Injectable()
export class WeaponDoesNotExistRule extends WeaponExistsRule {
  async validate(value: string, args: ValidationArguments) {
    const result = await super.validate(value, args);
    return !result;
  }

  defaultMessage(): string {
    return 'exceptions.WeaponAlreadyExists#{}';
  }
}
