import { define } from "cooky-cutter";
import { Animal, AnimalType, Hair, Size } from "../../src/models/Animal.interface";

export const animal = define<Animal>({
  name: 'Toby',
  age: 12,
  animal_type: AnimalType.DOG,
  hair: Hair.LONG,
  size: Size.MEDIUM,
});
