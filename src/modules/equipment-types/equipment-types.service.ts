import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EquipmentType } from './entities/equipment-type.entity';

@Injectable()
export class EquipmentTypesService {
  constructor(
    @InjectRepository(EquipmentType)
    private equipmentTypeRepository: Repository<EquipmentType>,
  ) {}

  findAll() {
    return this.equipmentTypeRepository.find({ order: { id: 'ASC' } });
  }

  findOne(where: Partial<EquipmentType>) {
    return this.equipmentTypeRepository.findOne(where);
  }
}
