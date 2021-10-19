import { IsEmail, IsString, IsNotEmpty, MinLength } from 'shared';

export class LoginDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
