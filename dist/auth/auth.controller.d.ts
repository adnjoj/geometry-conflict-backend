import { RegistrationDto } from './dto/registration.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegistrationResponseDto } from './dto/registration-response.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<LoginResponseDto>;
    register(body: RegistrationDto): Promise<RegistrationResponseDto>;
}
