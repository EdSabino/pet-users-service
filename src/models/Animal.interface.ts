export interface Animal {
  name: string;
  age: number;
  animal_type: AnimalType;
  hair: Hair;
  size: Size;
  image_id: String;
}

export enum Size {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export enum Hair {
  SHORT = 'short',
  LONG = 'long',
}

export enum AnimalType {
  CAT = 'cat',
  DOG = 'dog'
}
