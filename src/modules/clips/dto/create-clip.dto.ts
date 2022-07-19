import { IsString, MaxLength, Validate } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

import { Clip } from '../entities/clip.entity';

import {
  maxLengthValidationOptions,
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';
import { ClipDoesNotExistRule } from '../validation-rules/clip-does-not-exist.validation-rule';

export class CreateClipDto extends OmitType(Clip, ['id'] as const) {
  @IsString(stringValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  @Validate(ClipDoesNotExistRule)
  name: string;
}
