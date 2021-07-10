"use strict";

const create = require('./src/ports/handlers/create');
const get = require('./src/ports/handlers/get');
const update = require('./src/ports/handlers/update');

module.exports = {
  create,
  get,
  update
};
