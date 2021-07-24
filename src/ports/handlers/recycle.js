"use strict";

const RecycleUsecase = require('../../usecases/recycle');
const { decorators: { database, handler } } = require('shared');
const mongoose = require('mongoose');

module.exports = database(handler(RecycleUsecase, 200, 401), mongoose);
