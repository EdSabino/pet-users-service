"use strict";

const User = require('../ports/models/User');

async function get({ pathParameters }) {
  try {
    const user = await User.findOne({ _id: pathParameters._id }).lean();
    if (!user) {
      return { success: false, message: 'user_not_found' };
    }
    return { success: true, user };
  } catch (e) {
    return { success: false, message: 'user_not_found' };
  }
}

module.exports = get;
