import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Speciality } from './entities/speciality.entity';

@Injectable()
export class SpecialitiesService {
  constructor(
    @InjectRepository(Speciality)
    private specialityRepository: Repository<Speciality>,
  ) {}

  findAll() {
    return this.specialityRepository.find();
  }

  findOne(where: Partial<Speciality>) {
    return this.specialityRepository.findOne(where);
  }
}
