import { Type } from 'class-transformer';
import { IsInt, Validate } from 'class-validator';
import { intValidationOptions } from 'src/i18n/validation-options/exceptions.validation-options';
import { GameObjectExistsRule } from '../validation-rules/game-object-exists.validation-rule';

export class GameObjectIdDto {
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Validate(GameObjectExistsRule)
  id: number;
}
