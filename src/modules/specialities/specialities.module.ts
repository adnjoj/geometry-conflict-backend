import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Speciality } from './entities/speciality.entity';

import { SpecialityExistsRule } from './validation-rules/speciality-exists.validation-rule';
import { SpecialitiesService } from './specialities.service';
import { SpecialitiesController } from './specialities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Speciality])],
  controllers: [SpecialitiesController],
  providers: [SpecialitiesService, SpecialityExistsRule],
})
export class SpecialitiesModule {}
