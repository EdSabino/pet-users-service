"use strict";

const createUsecase = require('../../usecases/create');

async function create(event) {
  try {
    const res = await createUsecase(event);
    return {
      statusCode: 201,
      body: JSON.stringify(res)
    }
  } catch (err) {
    return {
      statusCode: err.code,
      body: JSON.stringify(err.body)
    }
  }
}

module.exports = create;
