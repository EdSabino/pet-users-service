"use strict";

const { v4 } = require('uuid');

const User = require('../ports/models/User');
const emailDispatcher = require('../ports/dispatchers/email_dispatcher');
const { validationError } = require('../errors/validation_errors');
const cache = require('../ports/repository/cache_repository');

exports.execute = async ({ body }) => {
  try {
    const user = await User.create(JSON.parse(body));
    const uuid = v4();
    await emailDispatcher('new_user', user.email, { uuid });
    await cache.add(uuid, user._id.toString());
    return { success: true, _id: user._id.toString() };
  } catch (e) {
    if (e.errors) {
      throw validationError(e);
    } else {
      console.log(e);
      throw { success: false, message: 'unknown_error' };
    }
  }
}
