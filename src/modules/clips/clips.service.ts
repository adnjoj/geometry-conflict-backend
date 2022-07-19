import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';

import { PATH_TO_STATIC } from 'src/constants/constants';

import { Clip } from './entities/clip.entity';
import { CreateClipDto } from './dto/create-clip.dto';
import { UpdateClipDto } from './dto/update-clip.dto';
import { ClipFilesDto } from './dto/clip-files.dto';

@Injectable()
export class ClipsService {
  constructor(
    @InjectRepository(Clip)
    private clipRepository: Repository<Clip>,
  ) {}

  findAll() {
    return this.clipRepository.find();
  }

  findOne(where: Partial<Clip>) {
    return this.clipRepository.findOne(where);
  }

  async create(clip: CreateClipDto) {
    const newClip = await this.clipRepository.save(clip);

    mkdirSync(join(PATH_TO_STATIC, 'clips', newClip.id.toString(10)));

    return newClip;
  }

  async update(id: number, clip: UpdateClipDto) {
    const oldClip = await this.clipRepository.findOne(id);
    return this.clipRepository.save(Object.assign(oldClip, clip));
  }

  async delete(id: number) {
    const deleteResult = await this.clipRepository.delete(id);

    rmSync(join(PATH_TO_STATIC, 'clips', id.toString(10)), {
      recursive: true,
      force: true,
    });

    return deleteResult;
  }

  saveFiles(id: number, files: ClipFilesDto) {
    const targetDirectory = join(PATH_TO_STATIC, 'clips', id.toString(10));

    Object.entries(files).forEach(([fileName, attachedFiles]) => {
      if (!attachedFiles[0]) return;

      writeFileSync(join(targetDirectory, fileName), attachedFiles[0].buffer);
    });
  }
}
