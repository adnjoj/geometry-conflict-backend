import { PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsObject } from 'class-validator';

import { objectValidationOptions } from 'src/i18n/validation-options/exceptions.validation-options';

import { Skin } from 'src/modules/skins/entities/skin.entity';

export class SetSkinDto {
  @Type(() => PickType(Skin, ['id'] as const))
  @IsObject(objectValidationOptions)
  skin!: Pick<Skin, 'id'>;
}
