import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { GameObjectsService } from '../game-objects.service';

@ValidatorConstraint({ name: 'GameObjectExists', async: true })
@Injectable()
export class GameObjectExistsRule implements ValidatorConstraintInterface {
  constructor(private gameObjectsService: GameObjectsService) {}

  async validate(value: string, args: ValidationArguments) {
    const gameObject = await this.gameObjectsService.findOne({
      [args.property]: value,
    });

    if (!gameObject) return false;
    return true;
  }

  defaultMessage() {
    return 'exceptions.GameObjectDoesNotExist#{}';
  }
}
