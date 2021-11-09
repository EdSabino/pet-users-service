import { Animal } from "./Animal.interface";
import { Establishment } from "./Establishment.interface";

export interface User {
  name: string;
  email: string;
  password: string;
  permissions: Object;
  email_confirmed: boolean;
  superadmin: boolean;
  animals: Animal[];
  image_id: string;
  establishments: Establishment[];
}
