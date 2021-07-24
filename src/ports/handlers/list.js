"use strict";

const ListUsecase = require('../../usecases/list');
const { decorators: { database, handler } } = require('shared');
const mongoose = require('mongoose');

module.exports = database(handler(ListUsecase, 200, 400), mongoose);
