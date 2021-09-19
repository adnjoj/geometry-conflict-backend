import { User } from '../../users/entities/user.entity';
export declare type RegistrationDto = Pick<User, 'email' | 'username' | 'password'>;
