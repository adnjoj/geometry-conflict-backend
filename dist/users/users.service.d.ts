import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findOneByUsername(username: string): Promise<User>;
    create(user: CreateUserDto): Promise<User>;
    update(id: number, user: UpdateUserDto): Promise<UpdateResult>;
    delete(id: number): Promise<DeleteResult>;
}
