import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateResult } from 'typeorm';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { Weapon } from '../entities/weapon.entity';

import { CreateWeaponDto } from '../dto/create-weapon.dto';
import { UpdateWeaponDto } from '../dto/update-weapon.dto';
import { WeaponFilesDto } from '../dto/weapon-files.dto';

import { WeaponsService } from '../services/weapons.service';

const fileFieldsInterceptor = FileFieldsInterceptor([
  { name: 'weaponImage', maxCount: 1 },
  { name: 'bulletImage', maxCount: 1 },
  { name: 'fireImage', maxCount: 1 },
  { name: 'reloadSound', maxCount: 1 },
  { name: 'shotSound', maxCount: 1 },
]);

@UseGuards(JwtAuthGuard)
@Controller('weapons')
export class WeaponsController {
  constructor(private weaponsService: WeaponsService) {}

  @Get()
  getAll(): Promise<Weapon[]> {
    return this.weaponsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<Weapon> {
    return this.weaponsService.findOne(id);
  }

  @Post()
  @UseInterceptors(fileFieldsInterceptor)
  create(
    @Body() data: CreateWeaponDto,
    @UploadedFiles() files: WeaponFilesDto,
  ): Promise<Weapon> {
    return this.weaponsService.create(data, files);
  }

  @Put(':id')
  @UseInterceptors(fileFieldsInterceptor)
  update(
    @Param('id') id: number,
    @Body() data: UpdateWeaponDto,
    @UploadedFiles() files: WeaponFilesDto,
  ): Promise<UpdateResult> {
    return this.weaponsService.update(id, data, files);
  }
}
