import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { SpecialityIdDto } from './dto/speciality-id.dto';

import { SpecialitiesService } from './specialities.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from 'src/modules/casl/guards/policies.guard';
import { CheckPolicies } from 'src/modules/casl/decorators/check-policies.decorator';
import { readSpecialityPolicyHandler } from './policy-handlers/read-speciality.policy-handler';

@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('specialities')
export class SpecialitiesController {
  constructor(private readonly specialitiesService: SpecialitiesService) {}

  @Get()
  @CheckPolicies(readSpecialityPolicyHandler)
  findAll() {
    return this.specialitiesService.findAll();
  }

  @Get(':id')
  @CheckPolicies(readSpecialityPolicyHandler)
  findOne(@Param() { id }: SpecialityIdDto) {
    return this.specialitiesService.findOne({ id });
  }
}
