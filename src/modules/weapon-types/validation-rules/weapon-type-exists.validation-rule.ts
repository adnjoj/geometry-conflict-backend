import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { WeaponTypesService } from '../weapon-types.service';

@ValidatorConstraint({ name: 'WeaponTypeExists', async: true })
@Injectable()
export class WeaponTypeExistsRule implements ValidatorConstraintInterface {
  constructor(private weaponTypesService: WeaponTypesService) {}

  async validate(value: string, args: ValidationArguments) {
    const weaponType = await this.weaponTypesService.findOne({
      [args.property]: value,
    });

    if (!weaponType) return false;
    return true;
  }

  defaultMessage() {
    return 'exceptions.WeaponTypeDoesNotExist#{}';
  }
}
