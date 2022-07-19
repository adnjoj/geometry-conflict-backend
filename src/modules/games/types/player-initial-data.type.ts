import type { Fraction as FractionEntity } from 'src/modules/fractions/entities/fraction.entity';
import type { Speciality as SpecialityEntity } from 'src/modules/specialities/entities/speciality.entity';
import type { WeaponToUser as WeaponToUserEntity } from 'src/modules/users/entities/weapon-to-user.entity';
import type { ClipToUser as ClipToUserEntity } from 'src/modules/users/entities/clip-to-user.entity';
import type { SkinToUser as SkinToUserEntity } from 'src/modules/users/entities/skin-to-user.entity';

export interface PlayerInitialData {
  id: number;
  username: string;
  fraction: FractionEntity;
  speciality: SpecialityEntity;
  skins: SkinToUserEntity[];
  weapons: WeaponToUserEntity[];
  clips: ClipToUserEntity[];
}
