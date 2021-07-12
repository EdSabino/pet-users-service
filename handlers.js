"use strict";

const create = require('./src/ports/handlers/create');
const get = require('./src/ports/handlers/get');
const update = require('./src/ports/handlers/update');
const list = require('./src/ports/handlers/list');
const login = require('./src/ports/handlers/login');

module.exports = {
  create,
  get,
  update,
  list,
  login
};
