import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Weapon } from './entities/weapon.entity';

import { WeaponExistsRule } from './validation-rules/weapon-exists.validation-rule';
import { WeaponDoesNotExistRule } from './validation-rules/weapon-does-not-exist.validation-rule';
import { WeaponsController } from './weapons.controller';
import { WeaponsService } from './weapons.service';

@Module({
  imports: [TypeOrmModule.forFeature([Weapon])],
  controllers: [WeaponsController],
  providers: [WeaponsService, WeaponExistsRule, WeaponDoesNotExistRule],
  exports: [WeaponsService],
})
export class WeaponsModule {}
