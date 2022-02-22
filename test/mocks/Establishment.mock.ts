import { define } from "cooky-cutter";
import { Establishment } from "../../src/models/Establishment.interface";

export const establishment = define<Establishment>({
  _id: () => 'randomString',
  name: () => 'Toby',
  address: () => 'Address',
  image_id: () => ''
});
