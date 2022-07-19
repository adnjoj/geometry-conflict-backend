import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Delete,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

import { CreateSkinDto } from './dto/create-skin.dto';
import { UpdateSkinDto } from './dto/update-skin.dto';
import { SkinFilesDto } from './dto/skin-files.dto';
import { SkinIdDto } from './dto/skin-id.dto';

import { SkinsService } from './skins.service';
import { CheckPolicies } from 'src/modules/casl/decorators/check-policies.decorator';
import { createSkinPolicyHandler } from './policy-handlers/create-skin.policy-handler';
import { readSkinPolicyHandler } from './policy-handlers/read-skin.policy-handler';
import { updateSkinPolicyHandler } from './policy-handlers/update-skin.policy-handler';
import { deleteSkinPolicyHandler } from './policy-handlers/delete-skin.policy-handler';

const fileFieldsInterceptor = FileFieldsInterceptor([
  { name: 'skinImage.png', maxCount: 1 },
]);

@UseGuards(JwtAuthGuard)
@Controller('skins')
export class SkinsController {
  constructor(private skinsService: SkinsService) {}

  @Get()
  @CheckPolicies(readSkinPolicyHandler)
  findAll() {
    return this.skinsService.findAll();
  }

  @Get(':id')
  @CheckPolicies(readSkinPolicyHandler)
  findOne(@Param() { id }: SkinIdDto) {
    return this.skinsService.findOne({ id });
  }

  @Post()
  @CheckPolicies(createSkinPolicyHandler)
  create(@Body() data: CreateSkinDto) {
    return this.skinsService.create(data);
  }

  @Post(':id/files')
  @CheckPolicies(createSkinPolicyHandler)
  @UseInterceptors(fileFieldsInterceptor)
  uploadFiles(
    @Param() { id }: SkinIdDto,
    @UploadedFiles() files: SkinFilesDto,
  ) {
    this.skinsService.saveFiles(id, files);
    return {};
  }

  @Patch(':id')
  @CheckPolicies(updateSkinPolicyHandler)
  update(@Param() { id }: SkinIdDto, @Body() data: UpdateSkinDto) {
    return this.skinsService.update(id, data);
  }

  @Delete(':id')
  @CheckPolicies(deleteSkinPolicyHandler)
  delete(@Param() { id }: SkinIdDto) {
    return this.skinsService.delete(id);
  }
}
