import { Action } from 'src/modules/casl/enums/action.enum';
import { AppAbility } from 'src/modules/casl/factories/casl-ability.factory';
import { GameObjectType } from '../entities/game-object-type.entity';

export const readGameObjectTypePolicyHandler = (ability: AppAbility) => {
  return ability.can(Action.Read, GameObjectType);
};
