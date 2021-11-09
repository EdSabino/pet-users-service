import { define, extend } from "cooky-cutter";
import { User } from "../../src/models/User.interface";
import { animal } from "./Animal.mock";
import { event, Event } from "./Event.mock";

type UserEvent = {} & Event;

export const user = define<User>({
  name: () => 'Establishment',
  email: () => 'eduardoaikin@gmail.com',
  password: () => 'senhafortissima',
  permissions: () => {},
  email_confirmed: true,
  superadmin: false,
  animals: () => [],
  image_id: '',
  establishments: () => [],
});

export const userEvent = extend<Event, UserEvent>(event, {
  body: JSON.stringify(user())
});
