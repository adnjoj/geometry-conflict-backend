import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    create(user: Omit<User, 'id'>): Promise<User>;
    update(id: number, user: Partial<User>): Promise<UpdateResult>;
    delete(id: number): Promise<DeleteResult>;
}
