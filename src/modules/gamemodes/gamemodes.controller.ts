import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { GamemodeIdDto } from './dto/gamemode-id.dto';

import { GamemodesService } from './gamemodes.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from 'src/modules/casl/guards/policies.guard';
import { CheckPolicies } from 'src/modules/casl/decorators/check-policies.decorator';
import { readGamemodePolicyHandler } from './policy-handlers/read-gamemode.policy-handler';

@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('gamemodes')
export class GamemodesController {
  constructor(private readonly gamemodesService: GamemodesService) {}

  @Get()
  @CheckPolicies(readGamemodePolicyHandler)
  findAll() {
    return this.gamemodesService.findAll();
  }

  @Get(':id')
  @CheckPolicies(readGamemodePolicyHandler)
  findOne(@Param() { id }: GamemodeIdDto) {
    return this.gamemodesService.findOne({ id });
  }
}
