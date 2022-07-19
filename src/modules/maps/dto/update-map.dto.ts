import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsString, MaxLength } from 'class-validator';

import {
  maxLengthValidationOptions,
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';
import { Map } from '../entities/map.entity';

export class UpdateMapDto extends PartialType(OmitType(Map, ['id'] as const)) {
  @IsString(stringValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  name: string;
}
