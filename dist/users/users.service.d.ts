import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PermissionsService } from '../permissions/permissions.service';
import { User } from './entities/user.entity';
export declare class UsersService {
    private userRepository;
    private permissionsService;
    constructor(userRepository: Repository<User>, permissionsService: PermissionsService);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findOneByUsername(username: string): Promise<User>;
    create(user: CreateUserDto): Promise<User>;
    update(id: number, user: UpdateUserDto): Promise<UpdateResult>;
    delete(id: number): Promise<DeleteResult>;
    addPermission(user: User, permissionName: string): Promise<User>;
    removePermission(user: User, permissionName: string): Promise<User>;
    hasPermission(user: User, permissionName: string): boolean;
}
