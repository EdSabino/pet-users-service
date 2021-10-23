import { define } from "cooky-cutter";
import { User } from "../../src/models/User.interface";
import { animal } from "./Animal.mock";

export const user = define<User>({
  name: () => 'Establishment',
  email: () => 'eduardoaikin@gmail.com',
  password: () => '1324',
  permissions: () => {},
  email_confirmed: true,
  superadmin: false,
  animals: (anmls) => anmls || [animal()]
});
