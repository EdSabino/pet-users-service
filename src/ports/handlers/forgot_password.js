"use strict";

const ForgotPasswordUsecase = require('../../usecases/forgot_password');
const { decorators: { database, handler } } = require('shared');
const mongoose = require('mongoose');

module.exports = database(handler(ForgotPasswordUsecase, 200, 400), mongoose);
