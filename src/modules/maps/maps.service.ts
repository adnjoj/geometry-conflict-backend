import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';

import { PATH_TO_STATIC } from 'src/constants/constants';

import { Map } from './entities/map.entity';
import { MapGameObject } from './entities/map-game-object.entity';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';
import { MapFilesDto } from './dto/map-files.dto';

@Injectable()
export class MapsService {
  constructor(
    @InjectRepository(Map)
    private mapRepository: Repository<Map>,
    @InjectRepository(MapGameObject)
    private gameObjectsRepository: TreeRepository<MapGameObject>,
  ) {}

  findAll() {
    return this.mapRepository.find();
  }

  async findOne(where: Partial<Map>) {
    const map = await this.mapRepository.findOne(where);
    if (!map) return null;

    map.gameObjects = [];

    const scene = await this.gameObjectsRepository.findOne({ map });
    if (!scene) return map;

    map.gameObjects = [
      await this.gameObjectsRepository.findDescendantsTree(scene, {
        relations: ['type', 'image'],
      }),
    ];

    return map;
  }

  async create(map: CreateMapDto) {
    const newMap = await this.mapRepository.save(map);

    mkdirSync(join(PATH_TO_STATIC, 'maps', newMap.id.toString(10)));

    return newMap;
  }

  async update(id: number, map: UpdateMapDto) {
    const oldMap = await this.mapRepository.findOne(id);
    return this.mapRepository.save(Object.assign(oldMap, map));
  }

  async delete(id: number) {
    const deleteResult = await this.mapRepository.delete(id);

    rmSync(join(PATH_TO_STATIC, 'maps', id.toString(10)), {
      recursive: true,
      force: true,
    });

    return deleteResult;
  }

  saveFiles(id: number, files: MapFilesDto) {
    const targetDirectory = join(PATH_TO_STATIC, 'maps', id.toString(10));

    Object.entries(files).forEach(([fileName, attachedFiles]) => {
      if (!attachedFiles[0]) return;

      writeFileSync(join(targetDirectory, fileName), attachedFiles[0].buffer);
    });
  }
}
