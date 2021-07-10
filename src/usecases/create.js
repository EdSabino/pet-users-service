"use strict";

const User = require('../ports/models/User');
const emailDispatcher = require('../ports/dispatchers/email_dispatcher');
const validationError = require('../errors/validation_errors');
const { database } = require('../ports/decorators');

async function create({ body }) {
  try {
    const user = await User.create(body);
    emailDispatcher('new_user', user.email, user);
    return { success: false, _id: user._id };
  } catch (e) {
    console.log(e);
    if (e.errors) {
      return validationError(e);
    } else {
      return { success: false, message: 'unknown_error' };
    }
  }
}

module.exports = database(create);
