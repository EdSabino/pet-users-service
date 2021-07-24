"use strict";

const GetUsecase = require('../../usecases/get');
const { database, handler } = require('../decorators');

module.exports = database(handler(GetUsecase, 200, 404));
