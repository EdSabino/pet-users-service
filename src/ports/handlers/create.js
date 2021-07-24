"use strict";

const CreateUsecase = require('../../usecases/create');
const { decorators: { database, handler } } = require('shared');
const mongoose = require('mongoose');

module.exports = database(handler(CreateUsecase, 201, 400), mongoose);
