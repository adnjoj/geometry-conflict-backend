import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  findOne(id: number): Promise<Permission> {
    return this.permissionRepository.findOne(id);
  }

  findOneByName(name: string): Promise<Permission> {
    return this.permissionRepository.findOne({ name });
  }

  create(name: string): Promise<Permission> {
    return this.permissionRepository.save({ name });
  }

  update(id: number, name: string): Promise<UpdateResult> {
    return this.permissionRepository.update(id, { name });
  }

  delete(id: number): Promise<DeleteResult> {
    return this.permissionRepository.delete(id);
  }
}
