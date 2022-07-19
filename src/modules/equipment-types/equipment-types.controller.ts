import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { EquipmentTypeIdDto } from './dto/equipment-type-id.dto';

import { EquipmentTypesService } from './equipment-types.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from 'src/modules/casl/guards/policies.guard';
import { CheckPolicies } from 'src/modules/casl/decorators/check-policies.decorator';
import { readEquipmentTypePolicyHandler } from './policy-handlers/read-equipment-type.policy-handler';

@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('equipment-types')
export class EquipmentTypesController {
  constructor(private readonly equipmentTypesService: EquipmentTypesService) {}

  @Get()
  @CheckPolicies(readEquipmentTypePolicyHandler)
  findAll() {
    return this.equipmentTypesService.findAll();
  }

  @Get(':id')
  @CheckPolicies(readEquipmentTypePolicyHandler)
  findOne(@Param() { id }: EquipmentTypeIdDto) {
    return this.equipmentTypesService.findOne({ id });
  }
}
