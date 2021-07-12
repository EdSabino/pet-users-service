"use strict";

const User = require('../ports/models/User');

async function get({ pathParameters }) {
  const user = await User.findOne({ _id: pathParameters._id });
  if (!user) {
    throw { success: false, message: 'user_not_found' };
  }
  delete user.password;
  return { success: true, user };
}

module.exports = get;
