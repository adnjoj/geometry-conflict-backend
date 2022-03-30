import { IsNotEmpty, MinLength } from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
