import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  create(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  update(id: number, user: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, user);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
