import { PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsInt, IsObject, Max, Min } from 'class-validator';

import {
  intValidationOptions,
  maxValidationOptions,
  minValidationOptions,
  objectValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';

import { Weapon } from 'src/modules/weapons/entities/weapon.entity';

export class SetWeaponDto {
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  @Max(2, maxValidationOptions)
  slot!: number;

  @Type(() => PickType(Weapon, ['id'] as const))
  @IsObject(objectValidationOptions)
  weapon!: Pick<Weapon, 'id'>;
}
