"use strict";

const User = require('../ports/models/User');

exports.execute = async ({ pathParameters }) => {
  const user = await User.findOne({ _id: pathParameters._id }, User.publicFields());
  if (!user) {
    throw { success: false, message: 'user_not_found' };
  }
  delete user.password;
  return { success: true, user };
}
