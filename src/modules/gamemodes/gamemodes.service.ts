import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Gamemode } from './entities/gamemode.entity';

@Injectable()
export class GamemodesService {
  constructor(
    @InjectRepository(Gamemode)
    private gamemodeRepository: Repository<Gamemode>,
  ) {}

  findAll() {
    return this.gamemodeRepository.find({ order: { id: 'ASC' } });
  }

  findOne(where: Partial<Gamemode>) {
    return this.gamemodeRepository.findOne(where);
  }
}
