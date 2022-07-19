import { Action } from 'src/modules/casl/enums/action.enum';
import { AppAbility } from 'src/modules/casl/factories/casl-ability.factory';
import { Skin } from '../entities/skin.entity';

export const readSkinPolicyHandler = (ability: AppAbility) => {
  return ability.can(Action.Read, Skin);
};
