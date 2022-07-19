import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';

import { PATH_TO_STATIC } from 'src/constants/constants';

import { GameObject } from './entities/game-object.entity';
import { CreateGameObjectDto } from './dto/create-game-object.dto';
import { UpdateGameObjectDto } from './dto/update-game-object.dto';
import { GameObjectFilesDto } from './dto/game-object-files.dto';

@Injectable()
export class GameObjectsService {
  constructor(
    @InjectRepository(GameObject)
    private gameObjectRepository: Repository<GameObject>,
  ) {}

  findAll() {
    return this.gameObjectRepository.find();
  }

  findOne(where: Partial<GameObject>) {
    return this.gameObjectRepository.findOne(where);
  }

  async create(gameObject: CreateGameObjectDto) {
    const newGameObject = await this.gameObjectRepository.save(gameObject);

    mkdirSync(
      join(PATH_TO_STATIC, 'game-objects', newGameObject.id.toString(10)),
    );

    return newGameObject;
  }

  async update(id: number, gameObject: UpdateGameObjectDto) {
    const oldGameObject = await this.gameObjectRepository.findOne(id);
    return this.gameObjectRepository.save(
      Object.assign(oldGameObject, gameObject),
    );
  }

  async delete(id: number) {
    const deleteResult = await this.gameObjectRepository.delete(id);

    rmSync(join(PATH_TO_STATIC, 'game-objects', id.toString(10)), {
      recursive: true,
      force: true,
    });

    return deleteResult;
  }

  saveFiles(id: number, files: GameObjectFilesDto) {
    const targetDirectory = join(
      PATH_TO_STATIC,
      'game-objects',
      id.toString(10),
    );

    Object.entries(files).forEach(([fileName, attachedFiles]) => {
      if (!attachedFiles[0]) return;

      writeFileSync(join(targetDirectory, fileName), attachedFiles[0].buffer);
    });
  }
}
