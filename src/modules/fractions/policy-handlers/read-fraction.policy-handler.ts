import { Action } from 'src/modules/casl/enums/action.enum';
import { AppAbility } from 'src/modules/casl/factories/casl-ability.factory';
import { Fraction } from '../entities/fraction.entity';

export const readFractionPolicyHandler = (ability: AppAbility) => {
  return ability.can(Action.Read, Fraction);
};
