import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';

import { PermissionsService } from '../permissions/permissions.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private permissionsService: PermissionsService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ username });
  }

  create(user: Omit<User, 'id' | 'permissions'>): Promise<User> {
    return this.userRepository.save(user);
  }

  update(id: number, user: Partial<User>): Promise<UpdateResult> {
    return this.userRepository.update(id, user);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  async addPermission(user: User, permissionName: string): Promise<User> {
    user.permissions.push(
      await this.permissionsService.findOneByName(permissionName),
    );

    return this.userRepository.save(user);
  }

  async removePermission(user: User, permissionName: string): Promise<User> {
    user.permissions = user.permissions.filter(
      (p) => p.name !== permissionName,
    );

    return this.userRepository.save(user);
  }

  hasPermission(user: User, permissionName: string): boolean {
    return (
      user.permissions.find((p) => p.name === permissionName) !== undefined
    );
  }
}
