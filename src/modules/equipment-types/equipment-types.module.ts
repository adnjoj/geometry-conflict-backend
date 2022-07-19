import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EquipmentType } from './entities/equipment-type.entity';

import { EquipmentTypeExistsRule } from './validation-rules/equipment-type-exists.validation-rule';
import { EquipmentTypesService } from './equipment-types.service';
import { EquipmentTypesController } from './equipment-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EquipmentType])],
  controllers: [EquipmentTypesController],
  providers: [EquipmentTypesService, EquipmentTypeExistsRule],
})
export class EquipmentTypesModule {}
