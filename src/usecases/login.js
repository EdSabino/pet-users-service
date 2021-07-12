"use strict";

const jwt = require('jsonwebtoken');

const User = require('../ports/models/User');

const createTokenFromUser = user => {
  delete user.password;
  delete user.__v;
  return jwt.sign(user.toObject(), process.env.SECRET, { expiresIn: '1h' });
}

async function login({ body }) {
  const user = await User.findOne({ email: body.email });
  if (user) {
    if (await user.comparePassword(body.password)) {
      return { success: true, token: createTokenFromUser(user) };
    } else {
      throw { success: false, message: 'wrong_password' };
    }
  }
  throw { success: false, message: 'user_not_found' };
}

module.exports = login;
