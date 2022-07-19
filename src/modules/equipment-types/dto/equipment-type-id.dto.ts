import { Type } from 'class-transformer';
import { IsInt, Validate } from 'class-validator';
import { intValidationOptions } from 'src/i18n/validation-options/exceptions.validation-options';
import { EquipmentTypeExistsRule } from '../validation-rules/equipment-type-exists.validation-rule';

export class EquipmentTypeIdDto {
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Validate(EquipmentTypeExistsRule)
  id: number;
}
