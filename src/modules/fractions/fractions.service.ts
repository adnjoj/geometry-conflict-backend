import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Fraction } from './entities/fraction.entity';

@Injectable()
export class FractionsService {
  constructor(
    @InjectRepository(Fraction)
    private fractionRepository: Repository<Fraction>,
  ) {}

  findAll() {
    return this.fractionRepository.find({ order: { id: 'ASC' } });
  }

  findOne(where: Partial<Fraction>) {
    return this.fractionRepository.findOne(where);
  }
}
