import { IsString, MaxLength, Validate } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';

import { Map } from '../entities/map.entity';

import {
  maxLengthValidationOptions,
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';
import { MapDoesNotExistRule } from '../validation-rules/map-does-not-exist.validation-rule';

export class CreateMapDto extends PickType(Map, ['gamemode'] as const) {
  @IsString(stringValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  @Validate(MapDoesNotExistRule)
  name: string;
}
