import { Type } from 'class-transformer';
import { IsInt, Validate } from 'class-validator';
import { intValidationOptions } from 'src/i18n/validation-options/exceptions.validation-options';
import { UserExistsRule } from '../validation-rules/user-exists.validation-rule';

export class UserIdDto {
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Validate(UserExistsRule)
  id!: number;
}
