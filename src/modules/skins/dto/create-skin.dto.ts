import { IsString, MaxLength, Validate } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

import { Skin } from '../entities/skin.entity';

import {
  maxLengthValidationOptions,
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';
import { SkinDoesNotExistRule } from '../validation-rules/skin-does-not-exist.validation-rule';

export class CreateSkinDto extends OmitType(Skin, ['id'] as const) {
  @IsString(stringValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  @Validate(SkinDoesNotExistRule)
  name!: string;
}
