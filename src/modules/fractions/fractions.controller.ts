import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { FractionIdDto } from './dto/fraction-id.dto';

import { FractionsService } from './fractions.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CheckPolicies } from 'src/modules/casl/decorators/check-policies.decorator';
import { PoliciesGuard } from 'src/modules/casl/guards/policies.guard';
import { readFractionPolicyHandler } from './policy-handlers/read-fraction.policy-handler';

@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('fractions')
export class FractionsController {
  constructor(private readonly fractionsService: FractionsService) {}

  @Get()
  @CheckPolicies(readFractionPolicyHandler)
  findAll() {
    return this.fractionsService.findAll();
  }

  @Get(':id')
  @CheckPolicies(readFractionPolicyHandler)
  findOne(@Param() { id }: FractionIdDto) {
    return this.fractionsService.findOne({ id });
  }
}
