import { Schema } from 'mongoose';
import { Establishment } from './Establishment.interface';

const establishmentSchema = new Schema<Establishment>({
  name: {
    type: String,
    required: [true, 'name_required']
  },
  address: String,
  image_id: String
});

export default establishmentSchema;
