import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { SkinTypeIdDto } from './dto/skin-type-id.dto';

import { SkinTypesService } from './skin-types.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from 'src/modules/casl/guards/policies.guard';
import { CheckPolicies } from 'src/modules/casl/decorators/check-policies.decorator';
import { readSkinTypePolicyHandler } from './policy-handlers/read-skin-type.policy-handler';

@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('skin-types')
export class SkinTypesController {
  constructor(private readonly skinTypesService: SkinTypesService) {}

  @Get()
  @CheckPolicies(readSkinTypePolicyHandler)
  findAll() {
    return this.skinTypesService.findAll();
  }

  @Get(':id')
  @CheckPolicies(readSkinTypePolicyHandler)
  findOne(@Param() { id }: SkinTypeIdDto) {
    return this.skinTypesService.findOne({ id });
  }
}
