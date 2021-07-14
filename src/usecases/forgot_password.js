"use strict";

const { v4 } = require('uuid');

const User = require('../ports/models/User');
const emailDispatcher = require('../ports/dispatchers/email_dispatcher');
const cache = require('../ports/repository/cache_repository');

async function forgotPassword({ pathParameters }) {
  const user = await User.findOne({ email: pathParameters.email });
  if (!user) {
    throw { success: false, message: 'user_not_found' };
  }
  const uuid = v4();
  try {
    await cache.add(uuid, user._id);
  } catch (e) {
    console.log(e)
  }
  emailDispatcher('forgot_password', user.email, { uuid });
  return { success: true, uuid: uuid };
}

module.exports = forgotPassword;
