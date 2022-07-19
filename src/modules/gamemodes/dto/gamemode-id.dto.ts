import { Type } from 'class-transformer';
import { IsInt, Validate } from 'class-validator';
import { intValidationOptions } from 'src/i18n/validation-options/exceptions.validation-options';
import { GamemodeExistsRule } from '../validation-rules/gamemode-exists.validation-rule';

export class GamemodeIdDto {
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Validate(GamemodeExistsRule)
  id: number;
}
