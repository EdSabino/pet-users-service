"use strict";

const UpdateUsecase = require('../../usecases/update');
const { decorators: { database, handler } } = require('shared');
const mongoose = require('mongoose');

module.exports = database(handler(UpdateUsecase, 200, 400), mongoose);
