"use strict";

const UpdateUsecase = require('../../usecases/update');
const { database, handler } = require('../decorators');

module.exports = database(handler(UpdateUsecase, 200, 400));
