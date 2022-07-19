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

import { CreateGameObjectDto } from './dto/create-game-object.dto';
import { UpdateGameObjectDto } from './dto/update-game-object.dto';
import { GameObjectFilesDto } from './dto/game-object-files.dto';
import { GameObjectIdDto } from './dto/game-object-id.dto';

import { GameObjectsService } from './game-objects.service';
import { CheckPolicies } from 'src/modules/casl/decorators/check-policies.decorator';
import { createGameObjectPolicyHandler } from './policy-handlers/create-game-object.policy-handler';
import { readGameObjectPolicyHandler } from './policy-handlers/read-game-object.policy-handler';
import { updateGameObjectPolicyHandler } from './policy-handlers/update-game-object.policy-handler';
import { deleteGameObjectPolicyHandler } from './policy-handlers/delete-game-object.policy-handler';

const fileFieldsInterceptor = FileFieldsInterceptor([
  { name: 'gameObjectImage.png', maxCount: 1 },
]);

@UseGuards(JwtAuthGuard)
@Controller('game-objects')
export class GameObjectsController {
  constructor(private gameObjectsService: GameObjectsService) {}

  @Get()
  @CheckPolicies(readGameObjectPolicyHandler)
  findAll() {
    return this.gameObjectsService.findAll();
  }

  @Get(':id')
  @CheckPolicies(readGameObjectPolicyHandler)
  findOne(@Param() { id }: GameObjectIdDto) {
    return this.gameObjectsService.findOne({ id });
  }

  @Post()
  @CheckPolicies(createGameObjectPolicyHandler)
  create(@Body() data: CreateGameObjectDto) {
    return this.gameObjectsService.create(data);
  }

  @Post(':id/files')
  @CheckPolicies(createGameObjectPolicyHandler)
  @UseInterceptors(fileFieldsInterceptor)
  uploadFiles(
    @Param() { id }: GameObjectIdDto,
    @UploadedFiles() files: GameObjectFilesDto,
  ) {
    this.gameObjectsService.saveFiles(id, files);
    return {};
  }

  @Patch(':id')
  @CheckPolicies(updateGameObjectPolicyHandler)
  update(@Param() { id }: GameObjectIdDto, @Body() data: UpdateGameObjectDto) {
    return this.gameObjectsService.update(id, data);
  }

  @Delete(':id')
  @CheckPolicies(deleteGameObjectPolicyHandler)
  delete(@Param() { id }: GameObjectIdDto) {
    return this.gameObjectsService.delete(id);
  }
}
