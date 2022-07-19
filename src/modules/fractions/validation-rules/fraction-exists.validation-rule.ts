import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { FractionsService } from '../fractions.service';

@ValidatorConstraint({ name: 'FractionExists', async: true })
@Injectable()
export class FractionExistsRule implements ValidatorConstraintInterface {
  constructor(private fractionsService: FractionsService) {}

  async validate(value: string, args: ValidationArguments) {
    const fraction = await this.fractionsService.findOne({
      [args.property]: value,
    });

    if (!fraction) return false;
    return true;
  }

  defaultMessage() {
    return 'exceptions.FractionDoesNotExist#{}';
  }
}
