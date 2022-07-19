import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { GameObjectTypesService } from '../game-object-types.service';

@ValidatorConstraint({ name: 'GameObjectTypeExists', async: true })
@Injectable()
export class GameObjectTypeExistsRule implements ValidatorConstraintInterface {
  constructor(private gameObjectTypesService: GameObjectTypesService) {}

  async validate(value: string, args: ValidationArguments) {
    const gameObjectType = await this.gameObjectTypesService.findOne({
      [args.property]: value,
    });

    if (!gameObjectType) return false;
    return true;
  }

  defaultMessage() {
    return 'exceptions.GameObjectTypeDoesNotExist#{}';
  }
}
