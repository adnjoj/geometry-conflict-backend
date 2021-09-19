import { User } from '../../users/entities/user.entity';

export type RegistrationDto = Pick<User, 'email' | 'username' | 'password'>;
