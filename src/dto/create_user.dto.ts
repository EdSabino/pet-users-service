import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { AnimalDto } from "./animal.dto";

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  permissions: Object;

  @ValidateNested()
  animals: AnimalDto[]

  @IsString()
  @IsOptional()
  image_id: string;
}

