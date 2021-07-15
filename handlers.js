"use strict";

const create = require('./src/ports/handlers/create');
const get = require('./src/ports/handlers/get');
const update = require('./src/ports/handlers/update');
const list = require('./src/ports/handlers/list');
const login = require('./src/ports/handlers/login');
const forgotPassword = require('./src/ports/handlers/forgot_password');
const recycle = require('./src/ports/handlers/recycle');
const { authorize } = require('authorization-pet-services');

module.exports = {
  create,
  get,
  update,
  list,
  login,
  forgotPassword,
  recycle,
  auth: (event, context, callback) => authorize(process.env.SECRET, event, context, callback),
};
