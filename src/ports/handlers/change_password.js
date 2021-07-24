"use strict";

const ChangePasswordUsecase = require('../../usecases/change_password');
const { database, handler } = require('../decorators');

module.exports = database(handler(ChangePasswordUsecase, 200, 404));
