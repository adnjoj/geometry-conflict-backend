import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Skin } from './entities/skin.entity';

import { SkinExistsRule } from './validation-rules/skin-exists.validation-rule';
import { SkinDoesNotExistRule } from './validation-rules/skin-does-not-exist.validation-rule';
import { SkinsService } from './skins.service';
import { SkinsController } from './skins.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Skin])],
  controllers: [SkinsController],
  providers: [SkinsService, SkinExistsRule, SkinDoesNotExistRule],
  exports: [SkinsService],
})
export class SkinsModule {}
