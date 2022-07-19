import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SkinType } from './entities/skin-type.entity';

@Injectable()
export class SkinTypesService {
  constructor(
    @InjectRepository(SkinType)
    private skinTypeRepository: Repository<SkinType>,
  ) {}

  findAll() {
    return this.skinTypeRepository.find({ order: { id: 'ASC' } });
  }

  findOne(where: Partial<SkinType>) {
    return this.skinTypeRepository.findOne(where);
  }
}
