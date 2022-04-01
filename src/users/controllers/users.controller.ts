import { Controller, Inject, Param, Get, UseGuards } from '@nestjs/common';

import { User } from '../entities/user.entity';

import { GetOneParamsDto } from '../dto/get-one-params.dto';

import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from 'src/casl/guards/policies.guard';
import { CheckPolicies } from 'src/casl/decorators/check-policies.decorator';
import { readUserPolicyHandler } from '../policy-handlers/read-user.policy-handler';

@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService)
    private usersService: UsersService,
  ) {}

  @Get()
  @CheckPolicies(readUserPolicyHandler)
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @CheckPolicies(readUserPolicyHandler)
  async getOne(@Param() params: GetOneParamsDto): Promise<User> {
    return this.usersService.findOne(params.id);
  }
}
