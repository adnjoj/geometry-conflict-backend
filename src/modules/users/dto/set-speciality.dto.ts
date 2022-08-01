import { PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsObject } from 'class-validator';

import { objectValidationOptions } from 'src/i18n/validation-options/exceptions.validation-options';

import { Speciality } from 'src/modules/specialities/entities/speciality.entity';

export class SetSpecialityDto {
  @Type(() => PickType(Speciality, ['id'] as const))
  @IsObject(objectValidationOptions)
  speciality!: Pick<Speciality, 'id'>;
}
