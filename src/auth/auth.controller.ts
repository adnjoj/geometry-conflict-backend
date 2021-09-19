import { Controller, UseGuards, Body, Request, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegistrationResponseDto } from './dto/registration-response.dto';
import { RegistrationDto } from './dto/registration.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }

  @Post('registration')
  register(@Body() body: RegistrationDto): Promise<RegistrationResponseDto> {
    return this.authService.register(body);
  }
}
