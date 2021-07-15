"use strict";

const create = require('./src/ports/handlers/create');
const get = require('./src/ports/handlers/get');
const update = require('./src/ports/handlers/update');
const list = require('./src/ports/handlers/list');
const login = require('./src/ports/handlers/login');
const forgotPassword = require('./src/ports/handlers/forgot_password');
const recycle = require('./src/ports/handlers/recycle');
const confirmEmail = require('./src/ports/handlers/confirm_email');
const changePassword = require('./src/ports/handlers/change_password');
const { authorize } = require('authorization-pet-services');

module.exports = {
  create,
  get,
  update,
  list,
  login,
  forgotPassword,
  recycle,
  confirmEmail,
  changePassword,
  authorize
};
