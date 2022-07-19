import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GameObjectType } from './entities/game-object-type.entity';

@Injectable()
export class GameObjectTypesService {
  constructor(
    @InjectRepository(GameObjectType)
    private gameObjectTypeRepository: Repository<GameObjectType>,
  ) {}

  findAll() {
    return this.gameObjectTypeRepository.find({ order: { id: 'ASC' } });
  }

  findOne(where: Partial<GameObjectType>) {
    return this.gameObjectTypeRepository.findOne(where);
  }
}
