import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';

import { User } from './entities/user.entity';
import { ClipToUser } from './entities/clip-to-user.entity';
import { Skin } from '../skins/entities/skin.entity';
import { Fraction } from '../fractions/entities/fraction.entity';
import { Speciality } from '../specialities/entities/speciality.entity';
import { Weapon } from '../weapons/entities/weapon.entity';
import { Clip } from '../clips/entities/clip.entity';

import { SkinsService } from '../skins/skins.service';
import { Map } from '../maps/entities/map.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(ClipToUser)
    private clipToUserRepository: Repository<ClipToUser>,

    @Inject(SkinsService)
    private skinsService: SkinsService,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOne(where: Partial<User>) {
    return this.userRepository.findOne(where);
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOne({ username });
  }

  create(user: CreateUserDto) {
    return this.userRepository.save(user);
  }

  delete(id: number) {
    return this.userRepository.delete(id);
  }

  async setFraction(user: User, fraction: Fraction) {
    user.fraction = fraction;
    user.skins = [];
    await this.userRepository.save(user);

    return { result: 'OK' };
  }

  async setSpeciality(user: User, speciality: Speciality) {
    user.speciality = speciality;
    user.weapons = [];
    user.clips = [];
    await this.userRepository.save(user);

    return { result: 'OK' };
  }

  async setSkin(user: User, { id }: Skin) {
    const skin = await this.skinsService.findOne({ id });
    user.skins = user.skins.filter((s) => s.skin.type.id !== skin.type.id);
    user.skins.push({ user, skin });

    await this.userRepository.save(user);

    return { result: 'OK' };
  }

  async setMap(user: User, map: Map) {
    user.map = map;
    await this.userRepository.save(user);

    return { result: 'OK' };
  }

  async setWeapon(user: User, weapon: Weapon, slot: number) {
    const weaponToUpdate = user.weapons.find((w) => w.slot === slot);

    if (!weaponToUpdate) user.weapons.push({ weapon, slot } as any);
    else weaponToUpdate.weapon = weapon;

    await this.userRepository.save(user);

    return { result: 'OK' };
  }

  async removeWeapon(user: User, slot: number) {
    user.weapons = user.weapons.filter((w) => w.slot !== slot);
    await this.userRepository.save(user);

    return { result: 'OK' };
  }

  async addClip(user: User, clip: Clip) {
    await this.clipToUserRepository
      .save({ amount: 0, user, clip })
      .catch(() => null);

    await this.clipToUserRepository.update(
      { user, clip },
      { amount: () => 'amount + 1' },
    );

    return { result: 'OK' };
  }

  async removeClip(user: User, clip: Clip) {
    await this.clipToUserRepository.update(
      { user, clip },
      { amount: () => 'amount - 1' },
    );
    await this.clipToUserRepository.delete({ amount: LessThanOrEqual(0) });

    return { result: 'OK' };
  }
}
