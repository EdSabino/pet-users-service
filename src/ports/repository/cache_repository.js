"use strict";

const redis = require('redis');
const { promisify } = require("util");

const redisHelper = {
  connect () {
    this.client = redis.createClient(`//${process.env.REDIS_HOST}:6379`);
    this.get = promisify(this.client.get).bind(this.client);
    this.set = promisify(this.client.set).bind(this.client);
  }
}

exports.add = async (key, value) => {
  redisHelper.connect();
  return redisHelper.set(key, value, 'EX', 60 * 60);
}

exports.get = async (key) => {
  redisHelper.connect();
  return redisHelper.get(key);
}
