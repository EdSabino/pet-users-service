"use strict";

const User = require('../ports/models/User');

async function list({ queryStringParameters: { page } }) {
  try {
    const users = await User.find({}, { limit: 10, skip: page*10 })
    const docs = users.lean();
    return { success: true, docs, paginate: { page, count: 10 }};
  } catch (e) {
    throw { success: false, message: 'user_not_found' };
  }
}

module.exports = list;
