import { IsEmail, IsString, IsNotEmpty, MinLength, IsBoolean } from 'shared';

export class LoginDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
