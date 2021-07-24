"use strict";

const ForgotPasswordUsecase = require('../../usecases/forgot_password');
const { database, handler } = require('../decorators');

module.exports = database(handler(ForgotPasswordUsecase, 200, 400));
