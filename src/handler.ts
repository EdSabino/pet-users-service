import {
  database,
  defaultGet,
  defaultList,
  defaultUpdate,
  hasPermission,
  isSuperAdmin,
  parseUser,
  wrapper,
  inject,
  action,
} from 'shared';
import User from './models/User';
import { AuthorizeService } from './services/authorize';
import { UserService } from './services/user';
import { AccessService } from './services/access';
import { connect } from 'mongoose';

@inject({
  model: User,
  services: {
    authorizeService: AuthorizeService,
    userService: UserService,
    accessService: AccessService
  }
})
export class UsersHandler {
  model: any;
  services: any;

  public get mongooseService() {
    return {
      connect: (val: string) => connect(val)
    }
  }

  @wrapper()
  @parseUser()
  @isSuperAdmin()
  @database()
  @defaultUpdate(false, 'user')
  async edit(_: any, __: any) {}

  @wrapper()
  @parseUser()
  @hasPermission('GetEstablishment', 'pathParameters._id')
  @database()
  @defaultGet('establishment')
  async get(_: any, __: any) {}

  @wrapper()
  @parseUser()
  @isSuperAdmin()
  @database()
  @defaultList('establishment')
  async list(_: any, __: any) {}

  async authorize(event: any, _: any) {
    return this.services.authorizeService.call(event);
  }

  @wrapper()
  @database()
  @action(true)
  async changePassword(event: any, _: any, { body }) {
    return this.services.userService.changePassword(event, body);
  }

  
  @wrapper()
  @database()
  @action(false)
  async confirmPassword(event: any, _: any) {
    return this.services.userService.confirmPassword(event);
  }

  @wrapper()
  @parseUser()
  @isSuperAdmin()
  @database()
  async create(event: any, _: any) {
    return {
      statusCode: 201,
      body: this.services.userService.createUser(event)
    }
  }

  @wrapper()
  @database()
  @action(false)
  async forgotPassword(event: any, _: any) {
    return this.services.userService.forgotPassword(event);
  }

  @wrapper()
  @database()
  @action(false)
  async login(event: any, __: any) {
    console.log(event.body)
    return this.services.accessService.login(JSON.parse(event.body));
  }

  @wrapper()
  @database()
  @action(false)
  async recycle(event: any, __: any) {
    return this.services.accessService.recycle(event);
  }
}
