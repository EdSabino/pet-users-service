"use strict";

const User = require('../ports/models/User');
const emailDispatcher = require('../ports/dispatchers/email_dispatcher');
const { validationError } = require('../errors/validation_errors');

async function create({ body }) {
  try {
    const user = await User.create(JSON.parse(body));
    emailDispatcher('new_user', user.email, user);
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
