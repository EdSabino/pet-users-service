import User from "../models/User";
import { inject } from "shared";
import { CacheRepository } from '../repositories/cache_repository';
import { EmailRepository } from '../repositories/email_repository';
import { v4 } from 'uuid';
import { UserDto } from "../dto/create_user.dto";
import { AnimalDto } from "../dto/animal.dto";

@inject({
  model: User,
  services: {
    cache: CacheRepository,
    emailRepository: EmailRepository
  }
})
export class UserService {
  services: any;
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
    const user = await User.findOne({ email: pathParameters.email });
    this.validateUser(user);
    const uuid = v4();
    await this.services.cache.add(uuid, user?._id.toString());
    this.services.emailRepository.dispatch('forgot_password', user?.email, { uuid });
    return { success: true, uuid: uuid };
  }

  async addAnimal (body: AnimalDto, loggedUser: any) {
    const result = await User.updateOne({ _id: loggedUser._id }, {
      $push: {
        animals: body
      }
    });

    if (result.ok == 0) {
      throw {
        statusCode: 404,
        body: { success: false, message: `user_not_found` }
      };
    }

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
