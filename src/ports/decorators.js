"use strict";
const mongoose = require('mongoose')

function database(args) {
  mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.log(err));
  create(args);
}

module.exports = {
  database
}
