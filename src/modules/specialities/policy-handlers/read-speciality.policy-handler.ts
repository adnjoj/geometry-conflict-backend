import { Action } from 'src/modules/casl/enums/action.enum';
import { AppAbility } from 'src/modules/casl/factories/casl-ability.factory';
import { Speciality } from '../entities/speciality.entity';

export const readSpecialityPolicyHandler = (ability: AppAbility) => {
  return ability.can(Action.Read, Speciality);
};
