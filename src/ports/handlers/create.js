"use strict";

const CreateUsecase = require('../../usecases/create');
const { database, handler } = require('../decorators');

module.exports = database(handler(CreateUsecase, 201, 400));
