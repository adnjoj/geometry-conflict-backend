import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SkinType } from './entities/skin-type.entity';

import { SkinTypeExistsRule } from './validation-rules/skin-type-exists.validation-rule';
import { SkinTypesService } from './skin-types.service';
import { SkinTypesController } from './skin-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SkinType])],
  controllers: [SkinTypesController],
  providers: [SkinTypesService, SkinTypeExistsRule],
  exports: [SkinTypesService],
})
export class SkinTypesModule {}
