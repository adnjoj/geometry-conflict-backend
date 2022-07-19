import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { SkinExistsRule } from './skin-exists.validation-rule';

@ValidatorConstraint({ name: 'SkinDoesNotExist', async: true })
@Injectable()
export class SkinDoesNotExistRule extends SkinExistsRule {
  async validate(value: string, args: ValidationArguments) {
    const result = await super.validate(value, args);
    return !result;
  }

  defaultMessage(): string {
    return 'exceptions.SkinAlreadyExists#{}';
  }
}
