import { Injectable } from '@nestjs/common';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';

import { Action } from '../enums/action.enum';
import { RolesEnum } from 'src/modules/roles/enums/roles.enum';

import { User } from 'src/modules/users/entities/user.entity';
import { Fraction } from 'src/modules/fractions/entities/fraction.entity';
import { Speciality } from 'src/modules/specialities/entities/speciality.entity';
import { Clip } from 'src/modules/clips/entities/clip.entity';
import { Weapon } from 'src/modules/weapons/entities/weapon.entity';
import { WeaponType } from 'src/modules/weapon-types/entities/weapon-type.entity';
import { EquipmentType } from 'src/modules/equipment-types/entities/equipment-type.entity';
import { SkinType } from 'src/modules/skin-types/entities/skin-type.entity';
import { Skin } from 'src/modules/skins/entities/skin.entity';
import { Gamemode } from '../../gamemodes/entities/gamemode.entity';
import { Map } from '../../maps/entities/map.entity';
import { GameObjectType } from '../../game-object-types/entities/game-object-type.entity';
import { GameObject } from '../../game-objects/entities/game-object.entity';

type Subjects =
  | InferSubjects<
      | typeof User
      | typeof Fraction
      | typeof Speciality
      | typeof SkinType
      | typeof Skin
      | typeof Clip
      | typeof Weapon
      | typeof WeaponType
      | typeof EquipmentType
      | typeof GameObjectType
      | typeof GameObject
      | typeof Gamemode
      | typeof Map
    >
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    can(Action.Read, 'all');
    can(Action.Update, User, { id: user.id });

    if (user.roles.find((role) => role.id === RolesEnum.ADMIN)) {
      can(Action.Manage, 'all');
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as unknown as ExtractSubjectType<Subjects>,
    });
  }
}
