import { Type } from 'class-transformer';
import { IsInt, Validate } from 'class-validator';
import { intValidationOptions } from 'src/i18n/validation-options/exceptions.validation-options';
import { SkinTypeExistsRule } from '../validation-rules/skin-type-exists.validation-rule';

export class SkinTypeIdDto {
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Validate(SkinTypeExistsRule)
  id: number;
}
