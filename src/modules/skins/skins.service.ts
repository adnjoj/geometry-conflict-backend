import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';

import { PATH_TO_STATIC } from 'src/constants/constants';

import { Skin } from './entities/skin.entity';
import { CreateSkinDto } from './dto/create-skin.dto';
import { UpdateSkinDto } from './dto/update-skin.dto';
import { SkinFilesDto } from './dto/skin-files.dto';

@Injectable()
export class SkinsService {
  constructor(
    @InjectRepository(Skin)
    private skinRepository: Repository<Skin>,
  ) {}

  findAll() {
    return this.skinRepository.find();
  }

  findOne(where: Partial<Skin>) {
    return this.skinRepository.findOne(where);
  }

  async create(skin: CreateSkinDto) {
    const newSkin = await this.skinRepository.save(skin);

    mkdirSync(join(PATH_TO_STATIC, 'skins', newSkin.id.toString(10)));

    return newSkin;
  }

  async update(id: number, skin: UpdateSkinDto) {
    const oldSkin = await this.skinRepository.findOne(id);
    return this.skinRepository.save(Object.assign(oldSkin, skin));
  }

  async delete(id: number) {
    const deleteResult = await this.skinRepository.delete(id);

    rmSync(join(PATH_TO_STATIC, 'skins', id.toString(10)), {
      recursive: true,
      force: true,
    });

    return deleteResult;
  }

  saveFiles(id: number, files: SkinFilesDto) {
    const targetDirectory = join(PATH_TO_STATIC, 'skins', id.toString(10));

    Object.entries(files).forEach(([fileName, attachedFiles]) => {
      if (!attachedFiles[0]) return;

      writeFileSync(join(targetDirectory, fileName), attachedFiles[0].buffer);
    });
  }
}
