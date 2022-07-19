import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { GamemodesService } from '../gamemodes.service';

@ValidatorConstraint({ name: 'GamemodeExists', async: true })
@Injectable()
export class GamemodeExistsRule implements ValidatorConstraintInterface {
  constructor(private gamemodesService: GamemodesService) {}

  async validate(value: string, args: ValidationArguments) {
    const gamemode = await this.gamemodesService.findOne({
      [args.property]: value,
    });

    if (!gamemode) return false;
    return true;
  }

  defaultMessage() {
    return 'exceptions.GamemodeDoesNotExist#{}';
  }
}
