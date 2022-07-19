import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { SkinTypesService } from '../skin-types.service';

@ValidatorConstraint({ name: 'SkinTypeExists', async: true })
@Injectable()
export class SkinTypeExistsRule implements ValidatorConstraintInterface {
  constructor(private skinTypesService: SkinTypesService) {}

  async validate(value: string, args: ValidationArguments) {
    const skinType = await this.skinTypesService.findOne({
      [args.property]: value,
    });

    if (!skinType) return false;
    return true;
  }

  defaultMessage() {
    return 'exceptions.SkinTypeDoesNotExist#{}';
  }
}
