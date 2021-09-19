import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { RegistrationDto } from './dto/registration.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegistrationResponseDto } from './dto/registration-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async checkCredentials(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async login(user: User): Promise<LoginResponseDto> {
    return {
      user,
      token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
      }),
    };
  }

  async register(data: RegistrationDto): Promise<RegistrationResponseDto> {
    if (data.username.length > 50) {
      throw new UnprocessableEntityException({
        message: 'Username max length is 50',
      });
    }

    const user = await this.usersService.create(data);

    return {
      user,
      token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
      }),
    };
  }
}
