import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from '../auth/auth.module';

import { GamesStore } from './stores/games.store';
import { GamesService } from './games.service';

import { GamesGateway } from './games.gateway';

@Module({
  imports: [AuthModule, JwtModule.register({ secret: process.env.JWT_SECRET })],
  providers: [GamesService, GamesStore, GamesGateway],
  exports: [GamesService],
})
export class GamesModule {}
