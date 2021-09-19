import { User } from '../../users/entities/user.entity';

export interface LoginResponseDto {
  token: string;
  user: Omit<User, 'password'>;
}
