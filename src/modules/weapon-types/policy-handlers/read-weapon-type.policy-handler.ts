import { Action } from 'src/modules/casl/enums/action.enum';
import { AppAbility } from 'src/modules/casl/factories/casl-ability.factory';
import { WeaponType } from '../entities/weapon-type.entity';

export const readWeaponTypePolicyHandler = (ability: AppAbility) => {
  return ability.can(Action.Read, WeaponType);
};
