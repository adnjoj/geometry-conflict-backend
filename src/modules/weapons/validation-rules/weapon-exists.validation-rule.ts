import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { WeaponsService } from '../weapons.service';

@ValidatorConstraint({ name: 'WeaponExists', async: true })
@Injectable()
export class WeaponExistsRule implements ValidatorConstraintInterface {
  constructor(private weaponsService: WeaponsService) {}

  async validate(value: string, args: ValidationArguments) {
    const weapon = await this.weaponsService.findOne({
      [args.property]: value,
    });

    if (!weapon) return false;
    return true;
  }

  defaultMessage() {
    return 'exceptions.WeaponDoesNotExist#{}';
  }
}
