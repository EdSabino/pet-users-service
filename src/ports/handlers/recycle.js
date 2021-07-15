"use strict";

const recycleUsecase = require('../../usecases/recycle');
const { database } = require('../decorators');

async function recycle(event) {
  try {
    const res = await recycleUsecase(event);
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify(err)
    }
  }
}

module.exports = database(recycle);
