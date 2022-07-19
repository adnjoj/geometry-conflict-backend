import { Action } from 'src/modules/casl/enums/action.enum';
import { AppAbility } from 'src/modules/casl/factories/casl-ability.factory';
import { EquipmentType } from '../entities/equipment-type.entity';

export const readEquipmentTypePolicyHandler = (ability: AppAbility) => {
  return ability.can(Action.Read, EquipmentType);
};
