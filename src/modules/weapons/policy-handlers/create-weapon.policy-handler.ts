import { Action } from 'src/modules/casl/enums/action.enum';
import { AppAbility } from 'src/modules/casl/factories/casl-ability.factory';
import { Weapon } from '../entities/weapon.entity';

export const createWeaponPolicyHandler = (ability: AppAbility) => {
  return ability.can(Action.Create, Weapon);
};
