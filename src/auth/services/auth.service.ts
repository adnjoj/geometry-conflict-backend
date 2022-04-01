import { hash, compare } from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../users/entities/user.entity';
import { RegistrationDto } from '../dto/registration.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { RegistrationResponseDto } from '../dto/registration-response.dto';

import { UsersService } from '../../users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async checkCredentials(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) return null;

    const passwordIsCorrect = await compare(password, user.password);

    if (!passwordIsCorrect) return null;
    return user;
  }

  async login(user: User): Promise<LoginResponseDto> {
    return {
      token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
    };
  }

  async register(data: RegistrationDto): Promise<RegistrationResponseDto> {
    if ((await this.usersService.findOneByUsername(data.username)) != null) {
      throw new BadRequestException('exceptions.UserExists#{}');
    }

    const hashedPassword = await hash(data.password, 10);
    const newUserData = { ...data, password: hashedPassword };
    const user = await this.usersService.create(newUserData);

    return {
      token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
    };
  }
}
