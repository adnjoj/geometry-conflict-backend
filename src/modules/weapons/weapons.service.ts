import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mkdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';

import { PATH_TO_STATIC } from 'src/constants/constants';

import { Weapon } from './entities/weapon.entity';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';
import { WeaponFilesDto } from './dto/weapon-files.dto';

@Injectable()
export class WeaponsService {
  constructor(
    @InjectRepository(Weapon)
    private weaponRepository: Repository<Weapon>,
  ) {}

  findAll() {
    return this.weaponRepository.find();
  }

  findOne(where: Partial<Weapon>) {
    return this.weaponRepository.findOne(where);
  }

  async create(weapon: CreateWeaponDto) {
    const newWeapon = await this.weaponRepository.save(weapon);

    try {
      mkdirSync(this.getPathToWeaponFolder(newWeapon.id));
    } catch (error) {
      // TODO: Logging
    }

    return newWeapon;
  }

  update(id: number, weapon: UpdateWeaponDto) {
    if (Object.keys(weapon).length === 0) return {};
    return this.weaponRepository.update({ id }, weapon);
  }

  async delete(id: number) {
    const deleteResult = await this.weaponRepository.delete(id);

    try {
      rmSync(this.getPathToWeaponFolder(id), { recursive: true, force: true });
    } catch (error) {
      // TODO: Logging
    }

    return deleteResult;
  }

  saveFiles(id: number, files: WeaponFilesDto) {
    const targetDirectory = this.getPathToWeaponFolder(id);

    Object.entries(files).forEach(
      ([fileName, attachedFiles]: [string, Express.Multer.File[]]) => {
        if (!attachedFiles?.[0]) return;
        writeFileSync(join(targetDirectory, fileName), attachedFiles[0].buffer);
      },
    );
  }

  private getPathToWeaponFolder(id: number) {
    return join(PATH_TO_STATIC, 'weapons', id.toString(10));
  }
}
