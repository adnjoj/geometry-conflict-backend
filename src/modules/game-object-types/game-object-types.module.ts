import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameObjectType } from './entities/game-object-type.entity';

import { GameObjectTypeExistsRule } from './validation-rules/game-object-type-exists.validation-rule';
import { GameObjectTypesService } from './game-object-types.service';
import { GameObjectTypesController } from './game-object-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GameObjectType])],
  controllers: [GameObjectTypesController],
  providers: [GameObjectTypesService, GameObjectTypeExistsRule],
})
export class GameObjectTypesModule {}
