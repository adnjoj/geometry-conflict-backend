import { Injectable } from '@nestjs/common';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';

import { Action } from '../enums/action.enum';
import { RolesEnum } from 'src/roles/enums/roles.enum';

import { User } from 'src/users/entities/user.entity';
import { Weapon } from 'src/weapons/entities/weapon.entity';

type Subjects = InferSubjects<typeof User | typeof Weapon> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    can(Action.Read, 'all');

    if (user.roles.find((role) => role.id === RolesEnum.ADMIN)) {
      can(Action.Manage, 'all');
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as unknown as ExtractSubjectType<Subjects>,
    });
  }
}
