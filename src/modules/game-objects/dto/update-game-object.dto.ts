import { PartialType } from '@nestjs/mapped-types';
import { IsString, MaxLength } from 'class-validator';

import { CreateGameObjectDto } from './create-game-object.dto';
import {
  maxLengthValidationOptions,
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';

export class UpdateGameObjectDto extends PartialType(CreateGameObjectDto) {
  @IsString(stringValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  name: string;
}
