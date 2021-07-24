"use strict";

const LoginUsecase = require('../../usecases/login');
const { decorators: { database, handler } } = require('shared');
const mongoose = require('mongoose');

module.exports = database(handler(LoginUsecase, 200, 401), mongoose);
