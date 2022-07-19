import { Type } from 'class-transformer';
import { IsInt, Validate } from 'class-validator';
import { intValidationOptions } from 'src/i18n/validation-options/exceptions.validation-options';
import { WeaponTypeExistsRule } from '../validation-rules/weapon-type-exists.validation-rule';

export class WeaponTypeIdDto {
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Validate(WeaponTypeExistsRule)
  id: number;
}
