"use strict";

const User = require('../ports/models/User');
const { validationError } = require('../errors/validation_errors');

async function update({ body, pathParameters }) {
  try {
    const result = await User.updateOne({ _id: pathParameters._id }, JSON.parse(body));
    if (result.ok == 0) {
      throw { success: false, message: 'user_not_found' };
    }
    return { success: true, _id: pathParameters._id };
  } catch (e) {
    if (e.errors) {
      throw validationError(e);
    } else if (e.message) {
      throw e;
    } else {
      throw { success: false, message: 'unknown_error' };
    }
  }
}

module.exports = update;
