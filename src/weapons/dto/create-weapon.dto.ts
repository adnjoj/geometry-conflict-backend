import { OmitType } from '@nestjs/mapped-types';
import { Weapon } from '../entities/weapon.entity';

export class CreateWeaponDto extends OmitType(Weapon, ['id'] as const) {}
