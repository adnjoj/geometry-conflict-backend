import { IsString, MaxLength, Validate } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

import { Weapon } from '../entities/weapon.entity';

import {
  maxLengthValidationOptions,
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';
import { WeaponDoesNotExistRule } from '../validation-rules/weapon-does-not-exist.validation-rule';

export class CreateWeaponDto extends OmitType(Weapon, ['id'] as const) {
  @IsString(stringValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  @Validate(WeaponDoesNotExistRule)
  name: string;
}
