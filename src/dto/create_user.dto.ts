import { IsEmail, IsNotEmpty, IsString, MinLength, ValidateNested, IsOptional } from "class-validator";
import { AnimalDto } from "./animal.dto";

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  permissions: Object;

  @ValidateNested()
  @IsOptional()
  animals: AnimalDto[];

  @IsString()
  @IsOptional()
  image_id: string;
}

