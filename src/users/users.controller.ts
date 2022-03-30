import {
  Controller,
  Inject,
  Param,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService)
    private usersService: UsersService,
  ) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }
}
