import { Action } from 'src/modules/casl/enums/action.enum';
import { AppAbility } from 'src/modules/casl/factories/casl-ability.factory';
import { GameObject } from '../entities/game-object.entity';

export const createGameObjectPolicyHandler = (ability: AppAbility) => {
  return ability.can(Action.Create, GameObject);
};
