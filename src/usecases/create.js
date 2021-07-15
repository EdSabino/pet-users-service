"use strict";

const { v4 } = require('uuid');

const User = require('../ports/models/User');
const emailDispatcher = require('../ports/dispatchers/email_dispatcher');
const { validationError } = require('../errors/validation_errors');
const cache = require('../ports/repository/cache_repository');

async function create({ body }) {
  try {
    const user = await User.create(JSON.parse(body));
    const uuid = v4();
    emailDispatcher('new_user', user.email, { uuid });
    await cache.add(uuid, user._id);
    return { success: true, _id: user._id };
  } catch (e) {
    if (e.errors) {
      throw validationError(e);
    } else {
      throw { success: false, message: 'unknown_error' };
    }
  }
}

module.exports = create;
