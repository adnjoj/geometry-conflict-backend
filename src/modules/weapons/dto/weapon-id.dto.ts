import { Type } from 'class-transformer';
import { IsInt, Validate } from 'class-validator';
import { intValidationOptions } from 'src/i18n/validation-options/exceptions.validation-options';
import { WeaponExistsRule } from '../validation-rules/weapon-exists.validation-rule';

export class WeaponIdDto {
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Validate(WeaponExistsRule)
  id!: number;
}
