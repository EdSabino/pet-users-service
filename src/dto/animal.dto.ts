import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { AnimalType, Hair, Size } from "../models/Animal.interface";

export class AnimalDto {
  @IsString()
  @IsNotEmpty()  
  name: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsEnum(AnimalType)
  animal_type: AnimalType;

  @IsEnum(Hair)
  hair: Hair;

  @IsEnum(Size)
  size: Size;
}
