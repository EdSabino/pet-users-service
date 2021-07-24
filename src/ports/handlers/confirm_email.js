"use strict";

const ConfirmEmailUsecase = require('../../usecases/confirm_email');
const { database, handler } = require('../decorators');

module.exports = database(handler(ConfirmEmailUsecase, 200, 404));
