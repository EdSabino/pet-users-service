"use strict";
const mongoose = require('mongoose');

function database(func) {
  return async (args) => {
    console.log('Mongo trying');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Mongo connected');
    return func(args);
  };
}

function handler (UseCase, success, failure) {
  return async (event) => {
    try {
      const res = await UseCase.execute(event);
      return {
        statusCode: success,
        body: JSON.stringify(res)
      }
    } catch (err) {
      return {
        statusCode: failure,
        body: JSON.stringify(err)
      }
    }
  }
}


module.exports = {
  database,
  handler
}
