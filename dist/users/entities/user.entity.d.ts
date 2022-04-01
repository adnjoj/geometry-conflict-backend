import { Role } from '../../roles/entities/role.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    roles: Role[];
}
