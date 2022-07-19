import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Gamemode } from './entities/gamemode.entity';

import { GamemodeExistsRule } from './validation-rules/gamemode-exists.validation-rule';
import { GamemodesService } from './gamemodes.service';
import { GamemodesController } from './gamemodes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Gamemode])],
  controllers: [GamemodesController],
  providers: [GamemodesService, GamemodeExistsRule],
})
export class GamemodesModule {}
