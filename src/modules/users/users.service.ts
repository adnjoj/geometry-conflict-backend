import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThanOrEqual, Repository } from 'typeorm';

import type { CreateUserDto } from './dto/create-user.dto';

import { User } from './entities/user.entity';
import { ClipToUser } from './entities/clip-to-user.entity';
import { SkinToUser } from './entities/skin-to-user.entity';
import { WeaponToUser } from './entities/weapon-to-user.entity';
import { Fraction } from '../fractions/entities/fraction.entity';
import { Speciality } from '../specialities/entities/speciality.entity';
import { Weapon } from '../weapons/entities/weapon.entity';
import { Map } from '../maps/entities/map.entity';

import { SkinsService } from '../skins/skins.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(ClipToUser)
    private clipToUserRepository: Repository<ClipToUser>,

    @InjectRepository(SkinToUser)
    private skinToUserRepository: Repository<SkinToUser>,

    @Inject(SkinsService)
    private skinsService: SkinsService,
  ) {}

  findAll(loadAllRelations = false) {
    return this.userRepository.find({
      relations: loadAllRelations
        ? ['fraction', 'speciality', 'skins', 'weapons', 'clips', 'map']
        : [],
    });
  }

  findOne(where: Partial<User>, loadAllRelations = false) {
    return this.userRepository.findOne({
      where,
      relations: loadAllRelations
        ? ['fraction', 'speciality', 'skins', 'weapons', 'clips', 'map']
        : [],
    });
  }

  async loadSkins(user: User) {
    return this.skinToUserRepository.find({
      id: In((await user.skins).map(({ id }) => id)),
    });
  }

  async loadClips(user: User) {
    return this.clipToUserRepository.find({
      id: In((await user.clips).map(({ id }) => id)),
    });
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

  async setFraction(user: User, fractionId: number) {
    user.fraction = Promise.resolve({ id: fractionId } as Fraction);
    user.skins = Promise.resolve([] as SkinToUser[]);
    await this.userRepository.save(user);

    return { result: 'OK' };
  }

  async setSpeciality(user: User, specialityId: number) {
    user.speciality = Promise.resolve({ id: specialityId } as Speciality);
    user.weapons = Promise.resolve([] as WeaponToUser[]);
    user.clips = Promise.resolve([] as ClipToUser[]);
    await this.userRepository.save(user);

    return { result: 'OK' };
  }

  async setSkin(user: User, skinId: number) {
    const skin = await this.skinsService.findOne({ id: skinId });
    const skins = await this.loadSkins(user);

    user.skins = Promise.resolve([
      ...skins.filter((s) => s.skin?.type?.id !== skin?.type?.id),
      { user, skin },
    ] as SkinToUser[]);

    await this.userRepository.save(user);

    return { result: 'OK' };
  }

  async setMap(user: User, mapId: number) {
    user.map = Promise.resolve({ id: mapId } as Map);
    await this.userRepository.save(user);

    return { result: 'OK' };
  }

  async setWeapon(user: User, slot: number, weaponId: number) {
    const weapon = { id: weaponId } as Weapon;
    const weapons = await user.weapons;
    const weaponToUpdate = weapons.find((w) => w.slot === slot);

    if (!weaponToUpdate) weapons.push({ weapon, slot } as WeaponToUser);
    else weaponToUpdate.weapon = weapon;

    user.weapons = Promise.resolve(weapons);
    await this.userRepository.save(user);

    return { result: 'OK' };
  }

  async removeWeapon(user: User, slot: number) {
    const weapons = await user.weapons;
    user.weapons = Promise.resolve(weapons.filter((w) => w.slot !== slot));
    await this.userRepository.save(user);

    return { result: 'OK' };
  }

  async addClip(user: User, clipId: number) {
    await this.clipToUserRepository
      .save({ amount: 0, user, clip: { id: clipId } })
      .catch(() => null);

    await this.clipToUserRepository.update(
      { user, clip: { id: clipId } },
      { amount: () => 'amount + 1' },
    );

    return { result: 'OK' };
  }

  async removeClip(user: User, clipId: number) {
    await this.clipToUserRepository.update(
      { user, clip: { id: clipId } },
      { amount: () => 'amount - 1' },
    );
    await this.clipToUserRepository.delete({ amount: LessThanOrEqual(0) });

    return { result: 'OK' };
  }
}
