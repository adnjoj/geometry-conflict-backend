import { Action } from 'src/casl/enums/action.enum';
import { AppAbility } from 'src/casl/factories/casl-ability.factory';
import { User } from '../entities/user.entity';

export const readUserPolicyHandler = (ability: AppAbility) => {
  return ability.can(Action.Read, User);
};
