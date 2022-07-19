import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { MapsService } from '../maps.service';

@ValidatorConstraint({ name: 'MapExists', async: true })
@Injectable()
export class MapExistsRule implements ValidatorConstraintInterface {
  constructor(private mapsService: MapsService) {}

  async validate(value: string, args: ValidationArguments) {
    const map = await this.mapsService.findOne({
      [args.property]: value,
    });

    if (!map) return false;
    return true;
  }

  defaultMessage() {
    return 'exceptions.MapDoesNotExist#{}';
  }
}
