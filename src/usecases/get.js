"use strict";

const User = require('../ports/models/User');

async function get({ pathParameters }) {
  try {
    const doc = await User.findOne({ _id: pathParameters._id });
    if (!doc) {
      return { success: false, message: 'user_not_found' };
    }
    const user = doc.lean();
    return { success: true, user };
  } catch (e) {
    console.log(e)
    return { success: false, message: 'user_not_found' };
  }
}

module.exports = get;
