import { Type } from 'class-transformer';
import { IsInt, Validate } from 'class-validator';
import { intValidationOptions } from 'src/i18n/validation-options/exceptions.validation-options';
import { SkinExistsRule } from '../validation-rules/skin-exists.validation-rule';

export class SkinIdDto {
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Validate(SkinExistsRule)
  id: number;
}
