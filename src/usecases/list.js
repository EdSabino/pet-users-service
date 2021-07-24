"use strict";

const User = require('../ports/models/User');

exports.execute = async ({ queryStringParameters: { page } }) => {
  try {
    const docs = await User.find({}, User.publicFields(), { limit: 10, skip: page*10 });
    return { success: true, docs, paginate: { page: parseInt(page), count: 10 }};
  } catch (e) {
    throw { success: false, message: 'user_not_found' };
  }
}
