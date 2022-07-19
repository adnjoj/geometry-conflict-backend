import { Action } from 'src/modules/casl/enums/action.enum';
import { AppAbility } from 'src/modules/casl/factories/casl-ability.factory';
import { SkinType } from '../entities/skin-type.entity';

export const readSkinTypePolicyHandler = (ability: AppAbility) => {
  return ability.can(Action.Read, SkinType);
};
