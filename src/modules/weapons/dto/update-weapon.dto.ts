import { PartialType } from '@nestjs/mapped-types';
import { IsString, MaxLength } from 'class-validator';

import { CreateWeaponDto } from './create-weapon.dto';
import {
  maxLengthValidationOptions,
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';

export class UpdateWeaponDto extends PartialType(CreateWeaponDto) {
  @IsString(stringValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  name: string;
}
