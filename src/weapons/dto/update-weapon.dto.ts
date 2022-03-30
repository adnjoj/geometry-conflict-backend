import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Weapon } from '../entities/weapon.entity';

export class UpdateWeaponDto extends PartialType(
  OmitType(Weapon, ['id'] as const),
) {}
