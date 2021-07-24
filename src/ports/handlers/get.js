"use strict";

const GetUsecase = require('../../usecases/get');
const { decorators: { database, handler } } = require('shared');
const mongoose = require('mongoose');

module.exports = database(handler(GetUsecase, 200, 404), mongoose);
