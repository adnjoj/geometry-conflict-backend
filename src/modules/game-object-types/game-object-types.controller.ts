import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { GameObjectTypeIdDto } from './dto/game-object-type-id.dto';

import { GameObjectTypesService } from './game-object-types.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from 'src/modules/casl/guards/policies.guard';
import { CheckPolicies } from 'src/modules/casl/decorators/check-policies.decorator';
import { readGameObjectTypePolicyHandler } from './policy-handlers/read-game-object-type.policy-handler';

@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('game-object-types')
export class GameObjectTypesController {
  constructor(
    private readonly gameObjectTypesService: GameObjectTypesService,
  ) {}

  @Get()
  @CheckPolicies(readGameObjectTypePolicyHandler)
  findAll() {
    return this.gameObjectTypesService.findAll();
  }

  @Get(':id')
  @CheckPolicies(readGameObjectTypePolicyHandler)
  findOne(@Param() { id }: GameObjectTypeIdDto) {
    return this.gameObjectTypesService.findOne({ id });
  }
}
