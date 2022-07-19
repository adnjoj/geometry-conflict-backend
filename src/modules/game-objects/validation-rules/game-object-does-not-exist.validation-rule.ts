import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { GameObjectExistsRule } from './game-object-exists.validation-rule';

@ValidatorConstraint({ name: 'GameObjectDoesNotExist', async: true })
@Injectable()
export class GameObjectDoesNotExistRule extends GameObjectExistsRule {
  async validate(value: string, args: ValidationArguments) {
    const result = await super.validate(value, args);
    return !result;
  }

  defaultMessage(): string {
    return 'exceptions.GameObjectAlreadyExists#{}';
  }
}
