import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { ClipExistsRule } from './clip-exists.validation-rule';

@ValidatorConstraint({ name: 'ClipDoesNotExist', async: true })
@Injectable()
export class ClipDoesNotExistRule extends ClipExistsRule {
  async validate(value: string, args: ValidationArguments) {
    const result = await super.validate(value, args);
    return !result;
  }

  defaultMessage(): string {
    return 'exceptions.ClipAlreadyExists#{}';
  }
}
