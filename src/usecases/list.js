"use strict";

const User = require('../ports/models/User');

async function list({ queryStringParameters: { page } }) {
  try {
    const docs = await User.find({}, User.publicFields(), { limit: 10, skip: page*10 });
    return { success: true, docs, paginate: { page: parseInt(page), count: 10 }};
  } catch (e) {
    throw { success: false, message: 'user_not_found' };
  }
}

module.exports = list;
