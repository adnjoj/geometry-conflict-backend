import { PartialType } from '@nestjs/mapped-types';
import { IsString, MaxLength } from 'class-validator';

import { CreateClipDto } from './create-clip.dto';
import {
  maxLengthValidationOptions,
  stringValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';

export class UpdateClipDto extends PartialType(CreateClipDto) {
  @IsString(stringValidationOptions)
  @MaxLength(50, maxLengthValidationOptions)
  name: string;
}
