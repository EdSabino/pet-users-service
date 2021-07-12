"use strict";

const User = require('../ports/models/User');

async function get({ pathParameters }) {
  const doc = await User.findOne({ _id: pathParameters._id });
  if (!doc) {
    throw { success: false, message: 'user_not_found' };
  }
  const user = doc.lean();
  return { success: true, user };
}

module.exports = get;
