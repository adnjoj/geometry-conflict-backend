import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async setFraction(userId: number, fraction: Fraction) {
    const user = await this.userRepository.findOne(userId);
    user.fraction = fraction;
    user.skins = [];
    return this.userRepository.save(user);
  }

  async setSpeciality(userId: number, speciality: Speciality) {
    const user = await this.userRepository.findOne(userId);
    user.speciality = speciality;
    user.weapons = [];
    user.clips = [];
    return this.userRepository.save(user);
  }

  async setSkin(userId: number, { id }: Skin) {
    const user = await this.userRepository.findOne(userId);
    const skin = await this.skinsService.findOne({ id });

    user.skins = user.skins.filter(
      ({ skin: { type } }) => type.id !== skin.type.id,
    );

    user.skins.push({ skin } as any);

    return this.userRepository.save(user);
  }

  async setMap(userId: number, map: Map) {
    const user = await this.userRepository.findOne(userId);
    user.map = map;
    return this.userRepository.save(user);
  }

  async setWeapon(userId: number, weapon: Weapon, slot: number) {
    const user = await this.userRepository.findOne(userId);
    const weaponToUpdate = user.weapons.find((w) => w.slot === slot);

    if (!weaponToUpdate) user.weapons.push({ weapon, slot } as any);
    else weaponToUpdate.weapon = weapon;

    return this.userRepository.save(user);
  }

  async removeWeapon(userId: number, slot: number) {
    const user = await this.userRepository.findOne(userId);
    user.weapons = user.weapons.filter((w) => w.slot !== slot);

    return this.userRepository.save(user);
  }

  async addClip(user: User, clip: Clip) {
    this.clipToUserRepository
      .createQueryBuilder()
      .insert()
      .into(ClipToUser)
      .values({ amount: 0, user, clip })
      .orIgnore()
      .execute();

    this.clipToUserRepository
      .createQueryBuilder()
      .update(ClipToUser)
      .set({
        amount: () => 'amount + 1',
      })
      .where({ user, clip })
      .execute();

    return { result: 'OK' };
  }

  async removeClip(user: User, clip: Clip) {
    this.clipToUserRepository
      .createQueryBuilder()
      .update(ClipToUser)
      .set({
        amount: () => 'amount - 1',
      })
      .where({ user, clip })
      .execute();

    this.clipToUserRepository
      .createQueryBuilder()
      .delete()
      .from(ClipToUser)
      .where('amount <= 0')
      .execute();

    return { result: 'OK' };
  }
}
