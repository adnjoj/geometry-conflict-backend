import {
  Controller,
  Inject,
  Param,
  Get,
  UseGuards,
  Post,
  Body,
  Delete,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { UserIdDto } from './dto/user-id.dto';
import { SetFractionDto } from './dto/set-fraction.dto';
import { SetSpecialityDto } from './dto/set-speciality.dto';
import { SetMapDto } from './dto/set-map.dto';
import { SetSkinDto } from './dto/set-skin.dto';
import { SetWeaponDto } from './dto/set-weapon.dto';
import { RemoveWeaponDto } from './dto/remove-weapon.dto';
import { AddClipDto } from './dto/add-clip.dto';
import { RemoveClipDto } from './dto/remove-clip.dto';

import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from 'src/modules/casl/guards/policies.guard';
import { CheckPolicies } from 'src/modules/casl/decorators/check-policies.decorator';

import { readUserPolicyHandler } from './policy-handlers/read-user.policy-handler';

@UseGuards(JwtAuthGuard, PoliciesGuard)
@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersService)
    private usersService: UsersService,
  ) {}

  @Get()
  @CheckPolicies(readUserPolicyHandler)
  findAll() {
    const loadAllRelations = true;
    return this.usersService.findAll(loadAllRelations);
  }

  @Get('me')
  findLoggedUser(@Req() { user }: Request) {
    const { id } = user!;
    const loadAllRelations = true;
    return this.usersService.findOne({ id }, loadAllRelations);
  }

  @Get(':id')
  findOne(@Param() { id }: UserIdDto) {
    const loadAllRelations = true;
    return this.usersService.findOne({ id }, loadAllRelations);
  }

  @Post('me/fraction')
  setFraction(@Req() { user }: Request, @Body() { fraction }: SetFractionDto) {
    return this.usersService.setFraction(user!, fraction.id);
  }

  @Post('me/speciality')
  setSpeciality(
    @Req() { user }: Express.Request,
    @Body() { speciality }: SetSpecialityDto,
  ) {
    return this.usersService.setSpeciality(user!, speciality.id);
  }

  @Post('me/map')
  setMap(@Req() { user }: Request, @Body() { map }: SetMapDto) {
    return this.usersService.setMap(user!, map.id);
  }

  @Post('me/skins')
  setSkin(@Req() { user }: Request, @Body() { skin }: SetSkinDto) {
    return this.usersService.setSkin(user!, skin.id);
  }

  @Post('me/weapons')
  setWeapon(@Req() { user }: Request, @Body() { weapon, slot }: SetWeaponDto) {
    return this.usersService.setWeapon(user!, slot, weapon.id);
  }

  @Delete('me/weapons')
  removeWeapon(@Req() { user }: Request, @Body() { slot }: RemoveWeaponDto) {
    return this.usersService.removeWeapon(user!, slot);
  }

  @Post('me/clips')
  addClip(@Req() { user }: Request, @Body() { clip }: AddClipDto) {
    return this.usersService.addClip(user!, clip.id);
  }

  @Delete('me/clips')
  removeClip(@Req() { user }: Request, @Body() { clip }: RemoveClipDto) {
    return this.usersService.removeClip(user!, clip.id);
  }
}
