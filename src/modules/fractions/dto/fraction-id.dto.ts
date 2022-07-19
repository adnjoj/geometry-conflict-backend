import { Type } from 'class-transformer';
import { IsInt, Validate } from 'class-validator';
import { intValidationOptions } from 'src/i18n/validation-options/exceptions.validation-options';
import { FractionExistsRule } from '../validation-rules/fraction-exists.validation-rule';

export class FractionIdDto {
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Validate(FractionExistsRule)
  id: number;
}
