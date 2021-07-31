"use strict";

const User = require('../ports/models/User');
const createTokenFromUser = require('./token_from_user');

exports.execute = async ({ body }) => {
  const parsed = JSON.parse(body);
  const user = await User.findOne({ email: parsed.email });
  if (user) {
    if (await user.comparePassword(parsed.password)) {
      if (user.email_confirmed) {
        delete user.password;
        return { success: true, token: createTokenFromUser(user) };
      } else {
        throw { success: false, message: 'email_not_confirmed' };
      }
    } else {
      throw { success: false, message: 'wrong_password' };
    }
  }
  throw { success: false, message: 'user_not_found' };
}
