import { PartialType } from '@nestjs/mapped-types';
import { IsString, MaxLength, MinLength } from 'class-validator';

import { CreateWeaponDto } from './create-weapon.dto';
import {
  maxLengthValidationOptions,
  minLengthValidationOptions,
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';

export class UpdateWeaponDto extends PartialType(CreateWeaponDto) {
  @IsString(stringValidationOptions)
  @MinLength(1, minLengthValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  name!: string;
}
