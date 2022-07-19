import { Type } from 'class-transformer';
import { IsInt, Validate } from 'class-validator';
import { intValidationOptions } from 'src/i18n/validation-options/exceptions.validation-options';
import { MapExistsRule } from '../validation-rules/map-exists.validation-rule';

export class MapIdDto {
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Validate(MapExistsRule)
  id: number;
}
