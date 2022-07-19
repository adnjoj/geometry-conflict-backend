import { Action } from 'src/modules/casl/enums/action.enum';
import { AppAbility } from 'src/modules/casl/factories/casl-ability.factory';
import { Map } from '../entities/map.entity';

export const deleteMapPolicyHandler = (ability: AppAbility) => {
  return ability.can(Action.Delete, Map);
};
