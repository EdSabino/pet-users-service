"use strict";
const mongoose = require('mongoose')

function database(func) {
  return async (args) => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Mongo connected');
    return func(args);
  };
}

module.exports = {
  database
}
