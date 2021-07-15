"use strict";

const confirmEmailUsecase = require('../../usecases/confirm_email');
const { database } = require('../decorators');

async function confirmEmail(event) {
  try {
    const res = await confirmEmailUsecase(event);
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

module.exports = database(confirmEmail);
