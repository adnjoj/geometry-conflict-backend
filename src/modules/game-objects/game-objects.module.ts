import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameObject } from './entities/game-object.entity';

import { GameObjectExistsRule } from './validation-rules/game-object-exists.validation-rule';
import { GameObjectDoesNotExistRule } from './validation-rules/game-object-does-not-exist.validation-rule';
import { GameObjectsService } from './game-objects.service';
import { GameObjectsController } from './game-objects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GameObject])],
  controllers: [GameObjectsController],
  providers: [
    GameObjectsService,
    GameObjectExistsRule,
    GameObjectDoesNotExistRule,
  ],
})
export class GameObjectsModule {}
