"use strict";
const mongoose = require('mongoose')

function database(func) {
  mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log('Mongo connected'))
   .catch(err => console.log(err));
  return (args) => func(args);
}

module.exports = {
  database
}
