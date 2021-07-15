"use strict";

const User = require('../ports/models/User');
const cache = require('../ports/repository/cache_repository');

async function confirmEmail({ pathParameters }) {
  const _id = await cache.get(pathParameters.uuid);
  const user = await User.findOneAndUpdate({ _id }, { email_confirmed: true });
  if (!user) {
    throw { success: false, message: 'user_not_found' };
  }
  return { success: true, _id: user._id };
}

module.exports = confirmEmail;
