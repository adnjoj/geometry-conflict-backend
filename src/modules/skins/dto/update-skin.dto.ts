import { PartialType } from '@nestjs/mapped-types';
import { IsString, MaxLength } from 'class-validator';

import { CreateSkinDto } from './create-skin.dto';
import {
  maxLengthValidationOptions,
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';

export class UpdateSkinDto extends PartialType(CreateSkinDto) {
  @IsString(stringValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  name!: string;
}
