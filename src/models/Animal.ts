import { Schema } from 'mongoose';
import { Animal } from './Animal.interface';

const animalSchema = new Schema<Animal>({
  name: {
    type: String,
    required: [true, 'name_required']
  },
  age: String,
  animal_type: {
    type: Array,
    item: {
      type: String,
      enum: ['cat', 'dog'],
      default: 'dog'
    }
  },
  hair: {
    type: Array,
    item: {
      type: String,
      enum: ['short', 'long'],
      default: 'short'
    }
  },
  size: {
    type: Array,
    item: {
      type: String,
      enum: ['small', 'medium', 'large'],
      default: 'medium'
    }
  },
});

export default animalSchema;
