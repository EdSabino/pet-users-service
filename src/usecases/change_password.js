"use strict";

const User = require('../ports/models/User');
const cache = require('../ports/repository/cache_repository');

async function changePassword({ pathParameters, body }) {
  const _id = await cache.get(pathParameters.uuid);
  const user = await User.findOneAndUpdate({ _id }, { password: body.password });
  if (!user) {
    throw { success: false, message: 'user_not_found' };
  }
  return { success: true, _id: user._id };
}

module.exports = changePassword;
