import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { EquipmentTypesService } from '../equipment-types.service';

@ValidatorConstraint({ name: 'EquipmentTypeExists', async: true })
@Injectable()
export class EquipmentTypeExistsRule implements ValidatorConstraintInterface {
  constructor(private equipmentTypesService: EquipmentTypesService) {}

  async validate(value: string, args: ValidationArguments) {
    const equipmentType = await this.equipmentTypesService.findOne({
      [args.property]: value,
    });

    if (!equipmentType) return false;
    return true;
  }

  defaultMessage() {
    return 'exceptions.EquipmentTypeDoesNotExist#{}';
  }
}
