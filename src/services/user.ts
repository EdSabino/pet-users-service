import User from "../models/User";
import { inject } from "shared";
import { CacheRepository } from '../repositories/cache_repository';
import { EmailRepository } from '../repositories/email_repository';
import { v4 } from 'uuid';
import { UserDto } from "../dto/create_user.dto";
import { AnimalDto } from "../dto/animal.dto";
import { EstablishmentDto } from "../dto/establishment.dto";

interface Services {
  cache: CacheRepository;
  emailRepository: EmailRepository;
}

@inject({
  model: User,
  services: {
    cache: CacheRepository,
    emailRepository: EmailRepository
  }
})
export class UserService {
  services: Services;
  model: any;

  async changePassword ({ pathParameters }, body) {
    const _id = await this.services.cache.getAndRemove(pathParameters.uuid);
    const user = await this.model.findOneAndUpdate({ _id }, { password: body.password });
    this.validateUser(user);
    return { _id: user._id };
  }

  async confirmPassword ({ pathParameters }) {
    const _id = await this.services.cache.getAndRemove(pathParameters.uuid);
    const user = await this.model.findOneAndUpdate({ _id }, { email_password: true });
    this.validateUser(user);
    return { _id: user._id };
  }

  async createUser (body: UserDto) {
    const user = await this.model.create(body);
    const uuid = v4();
    await this.services.emailRepository.dispatch('new_user', user.email, { uuid });
    await this.services.cache.add(uuid, user._id.toString());
    return { success: true, _id: user._id.toString() };
  }

  async forgotPassword ({ pathParameters }) {
    const user = await this.model.findOne({ email: pathParameters.email });
    this.validateUser(user);
    const uuid = v4();
    await this.services.cache.add(uuid, user?._id.toString());
    this.services.emailRepository.dispatch('forgot_password', user?.email || '', { uuid });
    return { success: true, uuid: uuid };
  }

  async addAnimal (body: AnimalDto, loggedUser: any) {
    const result = await this.model.updateOne({ _id: loggedUser._id }, {
      $push: {
        animals: body
      }
    });

    this.validateUser(result.ok);

    return { success: true };
  }

  async addEstablishment(body: EstablishmentDto, loggedUser: any) {
    const result = await this.model.updateOne({ _id: loggedUser._id }, {
      $push: {
        establishments: body
      }
    });

    this.validateUser(result.ok);

    return { success: true };
  }

  private validateUser(user: any) {
    if (!user) {
      throw this.notFound();
    }
  }

  private notFound() {
    return {
      statusCode: 404,
      body: {
        success: false, message: 'user_not_found'
      }
    };
  }
}
