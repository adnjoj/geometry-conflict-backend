import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

import { CreateClipDto } from './dto/create-clip.dto';
import { UpdateClipDto } from './dto/update-clip.dto';
import { ClipFilesDto } from './dto/clip-files.dto';
import { ClipIdDto } from './dto/clip-id.dto';

import { ClipsService } from './clips.service';
import { CheckPolicies } from 'src/modules/casl/decorators/check-policies.decorator';
import { createClipPolicyHandler } from './policy-handlers/create-clips.policy-handler';
import { readClipPolicyHandler } from './policy-handlers/read-clips.policy-handler';
import { updateClipPolicyHandler } from './policy-handlers/update-clips.policy-handler';
import { deleteClipPolicyHandler } from './policy-handlers/delete-clips.policy-handler';

const fileFieldsInterceptor = FileFieldsInterceptor([
  { name: 'clipImage.png', maxCount: 1 },
]);

@UseGuards(JwtAuthGuard)
@Controller('clips')
export class ClipsController {
  constructor(private readonly clipsService: ClipsService) {}

  @Get()
  @CheckPolicies(readClipPolicyHandler)
  findAll() {
    return this.clipsService.findAll();
  }

  @Get(':id')
  @CheckPolicies(readClipPolicyHandler)
  findOne(@Param() { id }: ClipIdDto) {
    return this.clipsService.findOne({ id });
  }

  @Post()
  @CheckPolicies(createClipPolicyHandler)
  create(@Body() data: CreateClipDto) {
    return this.clipsService.create(data);
  }

  @Post(':id/files')
  @CheckPolicies(createClipPolicyHandler)
  @UseInterceptors(fileFieldsInterceptor)
  uploadFiles(
    @Param() { id }: ClipIdDto,
    @UploadedFiles() files: ClipFilesDto,
  ) {
    this.clipsService.saveFiles(id, files);
    return {};
  }

  @Patch(':id')
  @CheckPolicies(updateClipPolicyHandler)
  update(@Param() { id }: ClipIdDto, @Body() data: UpdateClipDto) {
    return this.clipsService.update(id, data);
  }

  @Delete(':id')
  @CheckPolicies(deleteClipPolicyHandler)
  delete(@Param() { id }: ClipIdDto) {
    return this.clipsService.delete(id);
  }
}
