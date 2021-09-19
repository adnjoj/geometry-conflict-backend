import { Controller, Inject, Body, Get, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService)
    private usersService: UsersService,
  ) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Patch()
  update(@Body() body: UpdateUserDto): Promise<UpdateResult> {
    return this.usersService.update(body.id, body);
  }
}
