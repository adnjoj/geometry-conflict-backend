import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { WeaponTypeIdDto } from './dto/weapon-type-id.dto';

import { WeaponTypesService } from './weapon-types.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from 'src/modules/casl/guards/policies.guard';
import { CheckPolicies } from 'src/modules/casl/decorators/check-policies.decorator';
import { readWeaponTypePolicyHandler } from './policy-handlers/read-weapon-type.policy-handler';

@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('weapon-types')
export class WeaponTypesController {
  constructor(private readonly weaponTypesService: WeaponTypesService) {}

  @Get()
  @CheckPolicies(readWeaponTypePolicyHandler)
  findAll() {
    return this.weaponTypesService.findAll();
  }

  @Get(':id')
  @CheckPolicies(readWeaponTypePolicyHandler)
  findOne(@Param() { id }: WeaponTypeIdDto) {
    return this.weaponTypesService.findOne({ id });
  }
}
