"use strict";

const User = require('../ports/models/User');
const createTokenFromUser = require('./token_from_user');

exports.execute = async ({ requestContext }) => {
  const user = await User.findOne({ _id: requestContext.authorizer.claims._id }, User.publicFields());
  if (!user) {
    throw { success: false, message: 'user_not_found' };
  }
  return { success: true, token: createTokenFromUser(user) };
}
