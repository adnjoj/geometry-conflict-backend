import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesModule } from 'src/modules/roles/roles.module';
import { SkinsModule } from '../skins/skins.module';

import { User } from './entities/user.entity';
import { ClipToUser } from './entities/clip-to-user.entity';

import { UserExistsRule } from './validation-rules/user-exists.validation-rule';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ClipToUser]),
    RolesModule,
    SkinsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserExistsRule],
  exports: [UsersService],
})
export class UsersModule {}
