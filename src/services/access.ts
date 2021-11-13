import User from "../models/User";
import { inject } from "shared";
import { sign } from 'jsonwebtoken';
import { LoginDto } from "../dto/login.dto";

@inject({
  model: User,
  services: {}
})
export class AccessService {
  services: any;
  model: any;

  async login (body: LoginDto, { headers }) {
    try {
      const user = await this.model.findOne({ email: body.email });
      if (user) {
        if (await user.comparePassword(body.password)) {
          if (user.email_confirmed) {
            return { token: this.createTokenFromUser(user, headers['plataform-origin'] === 'app') };
          }
          this.error('email_not_confirmed');
        }
        this.error('wrong_password');
      }
      this.error('user_not_found');
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async recycle ({ requestContext, headers }) {
    console.log(requestContext)
    requestContext.authorizer.claims = JSON.parse(requestContext.authorizer.stringKey);
    const user = await this.model.findOne({ _id: requestContext.authorizer.claims._id }, this.model.publicFields());
    if (!user) {
      this.error('user_not_found');
    }
    return { token: this.createTokenFromUser(user, headers['plataform-origin'] === 'app') };
  }

  private createTokenFromUser(user: any, rememberMe: boolean) {
    delete user.password;
    delete user.__v;
    delete user.establishments;
    delete user.animals;
    return sign(user.toObject(), process.env.SECRET, { expiresIn: rememberMe ? '8760h' : '24h' });
  }

  private error(message: string) {
    throw {
      statusCode: 401,
      body: {
        success: false,
        message
      }
    };
  }
}
