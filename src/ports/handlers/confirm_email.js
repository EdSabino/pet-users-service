"use strict";

const confirmPasswordUsecase = require('../../usecases/confirm_email');
const { database } = require('../decorators');

async function confirmPassword(event) {
  try {
    const res = await confirmPasswordUsecase(event);
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  } catch (err) {
    return {
      statusCode: 404,
      body: JSON.stringify(err)
    }
  }
}

module.exports = database(confirmPassword);
