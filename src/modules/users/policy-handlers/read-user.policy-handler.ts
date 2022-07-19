import { Action } from 'src/modules/casl/enums/action.enum';
import { AppAbility } from 'src/modules/casl/factories/casl-ability.factory';
import { User } from '../entities/user.entity';

export const readUserPolicyHandler = (ability: AppAbility) => {
  return ability.can(Action.Read, User);
};
