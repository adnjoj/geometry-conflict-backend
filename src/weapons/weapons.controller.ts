import {
  Controller,
  Inject,
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

import { CreateWeaponDto } from './dto/create-weapon.dto';
import { UpdateWeaponDto } from './dto/update-weapon.dto';
import { WeaponFilesDto } from './dto/weapon-files.dto';

import { Weapon } from './entities/weapon.entity';
import { WeaponsService } from './weapons.service';

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
  constructor(
    @Inject(WeaponsService)
    private weaponsService: WeaponsService,
  ) {}

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
    @UploadedFiles() files: WeaponFilesDto,
    @Body() data: CreateWeaponDto,
  ): Promise<Weapon> {
    return this.weaponsService.create(data);
  }

  @Put(':id')
  @UseInterceptors(fileFieldsInterceptor)
  update(
    @Param('id') id: number,
    @UploadedFiles() files: WeaponFilesDto,
    @Body() data: UpdateWeaponDto,
  ): Promise<UpdateResult> {
    return this.weaponsService.update(id, data);
  }
}
