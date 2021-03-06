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
import { EstablishmentDto } from './dto/establishment.dto';

interface Services {
  authorizeService: AuthorizeService;
  userService: UserService;
  accessService: AccessService;
}

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
  services: Services;

  public mongooseService = {
    connect: (val: string) => {
      connect(val)
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
    if (event.type === 'REQUEST') {
      event.authorizationToken = event.headers.Auth;
    }
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
  @database()
  @body(UserDto)
  async create(event: any, _: any, extraArgs: any) {
    return {
      statusCode: 201,
      body: await this.services.userService.createUser(extraArgs.body)
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
    console.log(extraArgs.body)
    return this.services.accessService.login(extraArgs.body, event);
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
    return this.services.userService.addAnimal(extraArgs.body, event.requestContext.authorizer.claims);
  }

  @wrapper()
  @parseUser()
  @database()
  @action()
  @body(EstablishmentDto)
  async addEstablishment(event: any, __: any, extraArgs: any) {
    return this.services.userService.addEstablishment(extraArgs.body, event.requestContext.authorizer.claims);
  }

  @wrapper()
  @parseUser()
  @database()
  @action()
  async me(event: any, _: any, __: any) {
    const user = event.requestContext.authorizer.claims;
    return this.services.userService.getUser(user);
  }
}
