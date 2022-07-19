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

    mkdirSync(join(PATH_TO_STATIC, 'weapons', newWeapon.id.toString(10)));

    return newWeapon;
  }

  async update(id: number, weapon: UpdateWeaponDto) {
    const oldWeapon = await this.weaponRepository.findOne(id);
    return this.weaponRepository.save(Object.assign(oldWeapon, weapon));
  }

  async delete(id: number) {
    const deleteResult = await this.weaponRepository.delete(id);

    rmSync(join(PATH_TO_STATIC, 'weapons', id.toString(10)), {
      recursive: true,
      force: true,
    });

    return deleteResult;
  }

  saveFiles(id: number, files: WeaponFilesDto) {
    const targetDirectory = join(PATH_TO_STATIC, 'weapons', id.toString(10));

    Object.entries(files).forEach(([fileName, attachedFiles]) => {
      if (!attachedFiles[0]) return;

      writeFileSync(join(targetDirectory, fileName), attachedFiles[0].buffer);
    });
  }
}
