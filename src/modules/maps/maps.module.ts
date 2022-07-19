import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Map } from './entities/map.entity';
import { MapGameObject } from './entities/map-game-object.entity';

import { MapExistsRule } from './validation-rules/map-exists.validation-rule';
import { MapDoesNotExistRule } from './validation-rules/map-does-not-exist.validation-rule';
import { MapsService } from './maps.service';
import { MapsController } from './maps.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Map, MapGameObject])],
  controllers: [MapsController],
  providers: [MapsService, MapExistsRule, MapDoesNotExistRule],
  exports: [MapsService],
})
export class MapsModule {}
