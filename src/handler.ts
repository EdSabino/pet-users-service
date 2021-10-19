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
  body,
} from 'shared';
import User from './models/User';
import { AuthorizeService } from './services/authorize';
import { UserService } from './services/user';
import { AccessService } from './services/access';
import { connect } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/create_user.dto';
import { AnimalDto } from './dto/animal.dto';

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
  @action()
  async changePassword(event: any, _: any) {
    return this.services.userService.changePassword(event, JSON.parse(event.body));
  }

  
  @wrapper()
  @database()
  @action()
  async confirmPassword(event: any, _: any) {
    return this.services.userService.confirmPassword(event);
  }

  @wrapper()
  @parseUser()
  @isSuperAdmin()
  @database()
  @body(UserDto)
  async create(event: any, _: any, extraArgs: any) {
    return {
      statusCode: 201,
      body: this.services.userService.createUser(extraArgs.body)
    }
  }

  @wrapper()
  @database()
  @action()
  async forgotPassword(event: any, _: any) {
    return this.services.userService.forgotPassword(event);
  }

  @wrapper()
  @database()
  @action()
  @body(LoginDto)
  async login(event: any, __: any, extraArgs: any) {
    console.log(event.body)
    return this.services.accessService.login(extraArgs.body);
  }

  @wrapper()
  @database()
  @action()
  async recycle(event: any, __: any) {
    console.log(event)
    return this.services.accessService.recycle(event);
  }

  @wrapper()
  @parseUser()
  @database()
  @action()
  @body(AnimalDto)
  async addAnimal(event: any, __: any, extraArgs: any) {
    return this.services.user.addAnimal(extraArgs.body, event.requestContext.authorizer.claims);
  }
}
