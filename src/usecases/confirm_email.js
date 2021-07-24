"use strict";

const User = require('../ports/models/User');
const cache = require('../ports/repository/cache_repository');

exports.execute = async ({ pathParameters }) => {
  const _id = await cache.getAndRemove(pathParameters.uuid);
  const user = await User.findOneAndUpdate({ _id }, { email_confirmed: true });
  if (!user) {
    throw { success: false, message: 'user_not_found' };
  }
  return { success: true, _id: user._id };
}
