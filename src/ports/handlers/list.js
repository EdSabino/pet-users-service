"use strict";

const listUsecase = require('../../usecases/list');
const { database } = require('../decorators');

async function list(event) {
  try {
    const res = await listUsecase(event);
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err.body)
    }
  }
}

module.exports = database(list);
