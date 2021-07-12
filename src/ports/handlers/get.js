"use strict";

const getUsecase = require('../../usecases/get');
const { database } = require('../decorators');

async function get(event) {
  try {
    const res = await getUsecase(event);
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 404,
      body: JSON.stringify(err.body)
    }
  }
}

module.exports = database(get);
