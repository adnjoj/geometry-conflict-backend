import { Controller, UseGuards, Body, Request, Post } from '@nestjs/common';

import { RegistrationDto } from './dto/registration.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegistrationResponseDto } from './dto/registration-response.dto';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }

  @Post('registration')
  register(@Body() body: RegistrationDto): Promise<RegistrationResponseDto> {
    return this.authService.register(body);
  }
}
