import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { AnimalType, Hair, Size } from "../models/Animal.interface";

export class AnimalDto {
  @IsString()
  @IsNotEmpty()  
  name: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  age: number;

  @IsEnum(AnimalType)
  animal_type: AnimalType;

  @IsEnum(Hair)
  hair: Hair;

  @IsEnum(Size)
  size: Size;

  @IsOptional()
  @IsString()
  image_id: string;
}
