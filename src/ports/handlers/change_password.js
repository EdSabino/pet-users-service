"use strict";

const ChangePasswordUsecase = require('../../usecases/change_password');
const { database } = require('../decorators');

async function changePassword(event) {
  try {
    const res = await ChangePasswordUsecase.execute(event);
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

module.exports = database(changePassword);
