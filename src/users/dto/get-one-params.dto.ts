import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { intValidationOptions } from 'src/i18n/validation-options/exceptions.validation-options';

export class GetOneParamsDto {
  @Type(() => Number)
  @IsInt(intValidationOptions)
  id: number;
}
