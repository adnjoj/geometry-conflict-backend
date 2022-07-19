import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Clip } from './entities/clip.entity';

import { ClipExistsRule } from './validation-rules/clip-exists.validation-rule';
import { ClipDoesNotExistRule } from './validation-rules/clip-does-not-exist.validation-rule';
import { ClipsService } from './clips.service';
import { ClipsController } from './clips.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Clip])],
  controllers: [ClipsController],
  providers: [ClipsService, ClipExistsRule, ClipDoesNotExistRule],
})
export class ClipsModule {}
