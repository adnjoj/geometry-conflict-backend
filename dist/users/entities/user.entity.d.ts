import { Permission } from '../../permissions/entities/permission.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    permissions: Permission[];
}
