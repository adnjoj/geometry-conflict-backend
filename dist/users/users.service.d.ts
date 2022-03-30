import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { PermissionsService } from '../permissions/permissions.service';
import { User } from './entities/user.entity';
export declare class UsersService {
    private userRepository;
    private permissionsService;
    constructor(userRepository: Repository<User>, permissionsService: PermissionsService);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findOneByUsername(username: string): Promise<User>;
    create(user: Omit<User, 'id' | 'permissions'>): Promise<User>;
    update(id: number, user: Partial<User>): Promise<UpdateResult>;
    delete(id: number): Promise<DeleteResult>;
    addPermission(user: User, permissionName: string): Promise<User>;
    removePermission(user: User, permissionName: string): Promise<User>;
    hasPermission(user: User, permissionName: string): boolean;
}
