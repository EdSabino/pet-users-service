"use strict";

const LoginUsecase = require('../../usecases/login');
const { database, handler } = require('../decorators');

module.exports = database(handler(LoginUsecase, 200, 401));
