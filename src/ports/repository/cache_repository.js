"use strict";

const redis = require('redis');
const { promisify } = require("util");

const redisHelper = {
  connect () {
    this.client = redis.createClient(process.env.REDIS_URI);
    this.get = promisify(client.get).bind(client);
    this.set = promisify(client.set).bind(client);
  }
}

exports.add = async (key, value) => {
  redisHelper.connect();
  return redisHelper.set(key, value);
}

