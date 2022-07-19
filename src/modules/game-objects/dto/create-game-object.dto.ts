import { IsString, MaxLength, Validate } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

import { GameObject } from '../entities/game-object.entity';

import {
  maxLengthValidationOptions,
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';
import { GameObjectDoesNotExistRule } from '../validation-rules/game-object-does-not-exist.validation-rule';

export class CreateGameObjectDto extends OmitType(GameObject, ['id'] as const) {
  @IsString(stringValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  @Validate(GameObjectDoesNotExistRule)
  name: string;
}
