"use strict";

const User = require('../ports/models/User');
const cache = require('../ports/repository/cache_repository');

module.exports.execute = async ({ pathParameters, body }) => {
  const _id = await cache.getAndRemove(pathParameters.uuid);
  const user = await User.findOneAndUpdate({ _id }, { password: body.password });
  if (!user) {
    throw { success: false, message: 'user_not_found' };
  }
  return { success: true, _id: user._id };
}
