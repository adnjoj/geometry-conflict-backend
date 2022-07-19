import { Type } from 'class-transformer';
import { IsInt, Validate } from 'class-validator';
import { intValidationOptions } from 'src/i18n/validation-options/exceptions.validation-options';
import { GameObjectTypeExistsRule } from '../validation-rules/game-object-type-exists.validation-rule';

export class GameObjectTypeIdDto {
  @Type(() => Number)
  @IsInt(intValidationOptions)
  @Validate(GameObjectTypeExistsRule)
  id: number;
}
