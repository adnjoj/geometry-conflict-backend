import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';

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

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  create(user: Omit<User, 'id'>): Promise<User> {
    return this.userRepository.save(user);
  }

  update(id: number, user: Partial<User>): Promise<UpdateResult> {
    return this.userRepository.update(id, user);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
