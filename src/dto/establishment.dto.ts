import { IsNotEmpty, IsString } from "class-validator";
import { Establishment } from "../models/Establishment.interface";

export class EstablishmentDto implements Establishment {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  image_id: string;
}
