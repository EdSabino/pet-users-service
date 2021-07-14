"use strict";

const forgotPasswordUseCase = require('../../usecases/forgot_password');
const { database } = require('../decorators');

async function forgotPassword(event) {
  try {
    const res = await forgotPasswordUseCase(event);
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 400,
      body: JSON.stringify(err)
    }
  }
}

module.exports = database(forgotPassword);