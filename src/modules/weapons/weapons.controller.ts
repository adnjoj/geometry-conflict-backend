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

import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';
import { WeaponFilesDto } from './dto/weapon-files.dto';
import { WeaponIdDto } from './dto/weapon-id.dto';

import { WeaponsService } from './weapons.service';
import { CheckPolicies } from 'src/modules/casl/decorators/check-policies.decorator';
import { createWeaponPolicyHandler } from './policy-handlers/create-weapon.policy-handler';
import { readWeaponPolicyHandler } from './policy-handlers/read-weapon.policy-handler';
import { updateWeaponPolicyHandler } from './policy-handlers/update-weapon.policy-handler';
import { deleteWeaponPolicyHandler } from './policy-handlers/delete-weapon.policy-handler';

const fileFieldsInterceptor = FileFieldsInterceptor([
  { name: 'weaponImage.png', maxCount: 1 },
  { name: 'bulletImage.png', maxCount: 1 },
  { name: 'fireImage.png', maxCount: 1 },
  { name: 'reloadSound.mp3', maxCount: 1 },
  { name: 'shotSound.mp3', maxCount: 1 },
]);

@UseGuards(JwtAuthGuard)
@Controller('weapons')
export class WeaponsController {
  constructor(private weaponsService: WeaponsService) {}

  @Get()
  @CheckPolicies(readWeaponPolicyHandler)
  findAll() {
    return this.weaponsService.findAll();
  }

  @Get(':id')
  @CheckPolicies(readWeaponPolicyHandler)
  findOne(@Param() { id }: WeaponIdDto) {
    return this.weaponsService.findOne({ id });
  }

  @Post()
  @CheckPolicies(createWeaponPolicyHandler)
  create(@Body() data: CreateWeaponDto) {
    return this.weaponsService.create(data);
  }

  @Post(':id/files')
  @CheckPolicies(createWeaponPolicyHandler)
  @UseInterceptors(fileFieldsInterceptor)
  uploadFiles(
    @Param() { id }: WeaponIdDto,
    @UploadedFiles() files: WeaponFilesDto,
  ) {
    this.weaponsService.saveFiles(id, files);
    return {};
  }

  @Patch(':id')
  @CheckPolicies(updateWeaponPolicyHandler)
  update(@Param() { id }: WeaponIdDto, @Body() data: UpdateWeaponDto) {
    return this.weaponsService.update(id, data);
  }

  @Delete(':id')
  @CheckPolicies(deleteWeaponPolicyHandler)
  delete(@Param() { id }: WeaponIdDto) {
    return this.weaponsService.delete(id);
  }
}
