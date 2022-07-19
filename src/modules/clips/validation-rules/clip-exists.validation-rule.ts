import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { ClipsService } from '../clips.service';

@ValidatorConstraint({ name: 'ClipExists', async: true })
@Injectable()
export class ClipExistsRule implements ValidatorConstraintInterface {
  constructor(private clipsService: ClipsService) {}

  async validate(value: string, args: ValidationArguments) {
    const clip = await this.clipsService.findOne({
      [args.property]: value,
    });

    if (!clip) return false;
    return true;
  }

  defaultMessage() {
    return 'exceptions.ClipDoesNotExist#{}';
  }
}
