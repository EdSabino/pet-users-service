"use strict";

const ListUsecase = require('../../usecases/list');
const { database, handler } = require('../decorators');

module.exports = database(handler(ListUsecase, 200, 400));
