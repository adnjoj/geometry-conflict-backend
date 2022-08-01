import { PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsObject } from 'class-validator';

import { objectValidationOptions } from 'src/i18n/validation-options/exceptions.validation-options';

import { Map } from 'src/modules/maps/entities/map.entity';

export class SetMapDto {
  @Type(() => PickType(Map, ['id'] as const))
  @IsObject(objectValidationOptions)
  map!: Pick<Map, 'id'>;
}
