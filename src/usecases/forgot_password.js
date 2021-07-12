"use strict";

const { v4 } = require('uuid');

const User = require('../ports/models/User');
const emailDispatcher = require('../ports/dispatchers/email_dispatcher');
const cache = require('../ports/repository/cache_repository');

async function forgotPassword({ pathParameters }) {
  const user = await User.findOne({ _id: pathParameters._id });
  if (!user) {
    throw { success: false, message: 'user_not_found' };
  }
  const uuid = v4();
  await cache.add(uuid, user._id);
  emailDispatcher('forgot_password', user.email, { uuid });
  return { success: true, uuid: uuid };
}

module.exports = forgotPassword;
