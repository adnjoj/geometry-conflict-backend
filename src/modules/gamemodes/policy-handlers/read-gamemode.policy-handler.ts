import { Action } from 'src/modules/casl/enums/action.enum';
import { AppAbility } from 'src/modules/casl/factories/casl-ability.factory';
import { Gamemode } from '../entities/gamemode.entity';

export const readGamemodePolicyHandler = (ability: AppAbility) => {
  return ability.can(Action.Read, Gamemode);
};
