import User from "../models/User";
import { inject } from "shared";
import { sign } from 'jsonwebtoken';

@inject({
  model: User,
  services: {}
})
export class AccessService {
  services: any;
  model: any;

  async login (body: any) {
    try {
      const user = await this.model.findOne({ email: body.email });
      if (user) {
        if (await user.comparePassword(body.password)) {
          if (user.email_confirmed) {
            return { token: this.createTokenFromUser(user) };
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

  async recycle ({ requestContext }) {
    requestContext.authorizer.claims = JSON.parse(requestContext.authorizer.stringKey);
    const user = await this.model.findOne({ _id: requestContext.authorizer.claims._id }, this.model.publicFields());
    if (!user) {
      this.error('user_not_found');
    }
    return { token: this.createTokenFromUser(user) };
  }

  private createTokenFromUser(user: any) {
    delete user.password;
    delete user.__v;
    return sign(user.toObject(), process.env.SECRET, { expiresIn: '1h' });
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
