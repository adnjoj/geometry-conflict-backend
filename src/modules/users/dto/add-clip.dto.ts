import { PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsObject } from 'class-validator';

import { objectValidationOptions } from 'src/i18n/validation-options/exceptions.validation-options';

import { Clip } from 'src/modules/clips/entities/clip.entity';

export class AddClipDto {
  @Type(() => PickType(Clip, ['id'] as const))
  @IsObject(objectValidationOptions)
  clip!: Pick<Clip, 'id'>;
}
