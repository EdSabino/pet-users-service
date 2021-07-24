"use strict";

const ChangePasswordUsecase = require('../../usecases/change_password');
const { decorators: { database, handler } } = require('shared');
const mongoose = require('mongoose');

module.exports = database(handler(ChangePasswordUsecase, 200, 404), mongoose);
