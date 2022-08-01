import { PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsObject } from 'class-validator';

import { objectValidationOptions } from 'src/i18n/validation-options/exceptions.validation-options';

import { Fraction } from 'src/modules/fractions/entities/fraction.entity';

export class SetFractionDto {
  @Type(() => PickType(Fraction, ['id'] as const))
  @IsObject(objectValidationOptions)
  fraction!: Pick<Fraction, 'id'>;
}
