"use strict";

const User = require('../ports/models/User');
const { validationError } = require('../errors/validation_errors');

async function update({ body, pathParameters }) {
  try {
    const user = await User.updateOne({ _id: pathParameters._id }, body);
    return { success: true, user: user.lean() };
  } catch (e) {
    if (e.errors) {
      throw validationError(e);
    } else {
      throw { success: false, message: 'unknown_error' };
    }
  }
}

module.exports = update;
