import { Action } from 'src/modules/casl/enums/action.enum';
import { AppAbility } from 'src/modules/casl/factories/casl-ability.factory';
import { Clip } from '../entities/clip.entity';

export const deleteClipPolicyHandler = (ability: AppAbility) => {
  return ability.can(Action.Delete, Clip);
};
