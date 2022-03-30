import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { RegistrationDto } from './dto/registration.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegistrationResponseDto } from './dto/registration-response.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    checkCredentials(username: string, password: string): Promise<User>;
    login(user: User): Promise<LoginResponseDto>;
    register(data: RegistrationDto): Promise<RegistrationResponseDto>;
}
