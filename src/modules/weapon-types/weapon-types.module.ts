import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WeaponType } from './entities/weapon-type.entity';

import { WeaponTypeExistsRule } from './validation-rules/weapon-type-exists.validation-rule';
import { WeaponTypesService } from './weapon-types.service';
import { WeaponTypesController } from './weapon-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WeaponType])],
  controllers: [WeaponTypesController],
  providers: [WeaponTypesService, WeaponTypeExistsRule],
})
export class WeaponTypesModule {}
