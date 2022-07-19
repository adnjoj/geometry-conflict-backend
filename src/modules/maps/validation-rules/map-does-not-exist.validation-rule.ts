import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { MapExistsRule } from './map-exists.validation-rule';

@ValidatorConstraint({ name: 'MapDoesNotExist', async: true })
@Injectable()
export class MapDoesNotExistRule extends MapExistsRule {
  async validate(value: string, args: ValidationArguments) {
    const result = await super.validate(value, args);
    return !result;
  }

  defaultMessage(): string {
    return 'exceptions.MapAlreadyExists#{}';
  }
}
