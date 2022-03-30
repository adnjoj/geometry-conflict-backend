import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';

import { Weapon } from './entities/weapon.entity';
import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';

@Injectable()
export class WeaponsService {
  constructor(
    @InjectRepository(Weapon)
    private weaponRepository: Repository<Weapon>,
  ) {}

  findAll(): Promise<Weapon[]> {
    return this.weaponRepository.find();
  }

  findOne(id: number): Promise<Weapon> {
    return this.weaponRepository.findOne(id);
  }

  create(weapon: CreateWeaponDto): Promise<Weapon> {
    return this.weaponRepository.save(weapon);
  }

  update(id: number, weapon: UpdateWeaponDto): Promise<UpdateResult> {
    return this.weaponRepository.update(id, weapon);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.weaponRepository.delete(id);
  }
}
