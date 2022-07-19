import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { SkinsService } from '../skins.service';

@ValidatorConstraint({ name: 'SkinExists', async: true })
@Injectable()
export class SkinExistsRule implements ValidatorConstraintInterface {
  constructor(private skinsService: SkinsService) {}

  async validate(value: string, args: ValidationArguments) {
    const skin = await this.skinsService.findOne({
      [args.property]: value,
    });

    if (!skin) return false;
    return true;
  }

  defaultMessage() {
    return 'exceptions.SkinDoesNotExist#{}';
  }
}
