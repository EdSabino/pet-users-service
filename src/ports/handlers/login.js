"use strict";

const loginUsecase = require('../../usecases/login');
const { database } = require('../decorators');

async function login(event) {
  try {
    const res = await loginUsecase(event);
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify(err.body)
    }
  }
}

module.exports = database(login);
