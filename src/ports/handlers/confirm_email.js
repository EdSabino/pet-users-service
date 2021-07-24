"use strict";

const ConfirmEmailUsecase = require('../../usecases/confirm_email');
const { decorators: { database, handler } } = require('shared');
const mongoose = require('mongoose');

module.exports = database(handler(ConfirmEmailUsecase, 200, 404), mongoose);
