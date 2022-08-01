import { Type } from 'class-transformer';
import { IsInt, Validate } from 'class-validator';
import { intValidationOptions } from 'src/i18n/validation-options/exceptions.validation-options';
import { SpecialityExistsRule } from '../validation-rules/speciality-exists.validation-rule';

export class SpecialityIdDto {
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Validate(SpecialityExistsRule)
  id!: number;
}
