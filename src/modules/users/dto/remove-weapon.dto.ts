import { IsInt, Max, Min } from 'class-validator';

import {
  intValidationOptions,
  maxValidationOptions,
  minValidationOptions,
} from 'src/i18n/validation-options/exceptions.validation-options';

export class RemoveWeaponDto {
  @IsInt(intValidationOptions)
  @Min(0, minValidationOptions)
  @Max(2, maxValidationOptions)
  slot!: number;
}
