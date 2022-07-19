import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Fraction } from './entities/fraction.entity';

import { FractionExistsRule } from './validation-rules/fraction-exists.validation-rule';
import { FractionsService } from './fractions.service';
import { FractionsController } from './fractions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Fraction])],
  controllers: [FractionsController],
  providers: [FractionsService, FractionExistsRule],
})
export class FractionsModule {}
