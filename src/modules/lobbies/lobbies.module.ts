import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from '../auth/auth.module';
import { GamesModule } from '../games/games.module';
import { MapsModule } from '../maps/maps.module';
import { SkinTypesModule } from '../skin-types/skin-types.module';
import { UsersModule } from '../users/users.module';

import { LobbiesService } from './lobbies.service';

import { LobbiesStore } from './stores/lobbies.store';

import { LobbiesGateway } from './lobbies.gateway';

@Module({
  imports: [
    AuthModule,
    GamesModule,
    MapsModule,
    SkinTypesModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 60 },
    }),
  ],
  providers: [LobbiesService, LobbiesStore, LobbiesGateway],
})
export class LobbiesModule {}
