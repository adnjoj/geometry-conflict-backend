import { Type } from 'class-transformer';
import { IsInt, Validate } from 'class-validator';
import { intValidationOptions } from 'src/i18n/validation-options/exceptions.validation-options';
import { ClipExistsRule } from '../validation-rules/clip-exists.validation-rule';

export class ClipIdDto {
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Validate(ClipExistsRule)
  id: number;
}
