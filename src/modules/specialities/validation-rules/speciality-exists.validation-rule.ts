import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { SpecialitiesService } from '../specialities.service';

@ValidatorConstraint({ name: 'SpecialityExists', async: true })
@Injectable()
export class SpecialityExistsRule implements ValidatorConstraintInterface {
  constructor(private specialitiesService: SpecialitiesService) {}

  async validate(value: string, args: ValidationArguments) {
    const speciality = await this.specialitiesService.findOne({
      [args.property]: value,
    });

    if (!speciality) return false;
    return true;
  }

  defaultMessage() {
    return 'exceptions.SpecialityDoesNotExist#{}';
  }
}
