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

import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';
import { MapFilesDto } from './dto/map-files.dto';
import { MapIdDto } from './dto/map-id.dto';

import { MapsService } from './maps.service';
import { CheckPolicies } from 'src/modules/casl/decorators/check-policies.decorator';
import { createMapPolicyHandler } from './policy-handlers/create-map.policy-handler';
import { readMapPolicyHandler } from './policy-handlers/read-map.policy-handler';
import { updateMapPolicyHandler } from './policy-handlers/update-map.policy-handler';
import { deleteMapPolicyHandler } from './policy-handlers/delete-map.policy-handler';

const fileFieldsInterceptor = FileFieldsInterceptor([
  { name: 'mapImage.png', maxCount: 1 },
]);

@UseGuards(JwtAuthGuard)
@Controller('maps')
export class MapsController {
  constructor(private mapsService: MapsService) {}

  @Get()
  @CheckPolicies(readMapPolicyHandler)
  findAll() {
    return this.mapsService.findAll();
  }

  @Get(':id')
  @CheckPolicies(readMapPolicyHandler)
  findOne(@Param() { id }: MapIdDto) {
    return this.mapsService.findOne({ id });
  }

  @Post()
  @CheckPolicies(createMapPolicyHandler)
  create(@Body() data: CreateMapDto) {
    return this.mapsService.create(data);
  }

  @Post(':id/files')
  @CheckPolicies(createMapPolicyHandler)
  @UseInterceptors(fileFieldsInterceptor)
  uploadFiles(@Param() { id }: MapIdDto, @UploadedFiles() files: MapFilesDto) {
    this.mapsService.saveFiles(id, files);
    return {};
  }

  @Patch(':id')
  @CheckPolicies(updateMapPolicyHandler)
  update(@Param() { id }: MapIdDto, @Body() data: UpdateMapDto) {
    return this.mapsService.update(id, data);
  }

  @Delete(':id')
  @CheckPolicies(deleteMapPolicyHandler)
  delete(@Param() { id }: MapIdDto) {
    return this.mapsService.delete(id);
  }
}
