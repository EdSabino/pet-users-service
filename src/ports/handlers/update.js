"use strict";

const updateUsecase = require('../../usecases/update');
const { database } = require('../decorators');

async function update(event) {
  try {
    const res = await updateUsecase(event);
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err)
    }
  }
}

module.exports = database(update);
