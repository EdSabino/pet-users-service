"use strict";

const RecycleUsecase = require('../../usecases/recycle');
const { database, handler } = require('../decorators');

module.exports = database(handler(RecycleUsecase, 200, 401));
