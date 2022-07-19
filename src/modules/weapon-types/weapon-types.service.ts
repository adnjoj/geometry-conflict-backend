import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WeaponType } from './entities/weapon-type.entity';

@Injectable()
export class WeaponTypesService {
  constructor(
    @InjectRepository(WeaponType)
    private weaponTypeRepository: Repository<WeaponType>,
  ) {}

  findAll() {
    return this.weaponTypeRepository.find({ order: { id: 'ASC' } });
  }

  findOne(where: Partial<WeaponType>) {
    return this.weaponTypeRepository.findOne(where);
  }
}
