import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Weapon } from './entities/weapon.entity';

import { WeaponsController } from './controllers/weapons.controller';
import { WeaponsService } from './services/weapons.service';

@Module({
  imports: [TypeOrmModule.forFeature([Weapon])],
  controllers: [WeaponsController],
  providers: [WeaponsService],
  exports: [WeaponsService],
})
export class WeaponsModule {}
