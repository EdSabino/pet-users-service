"use strict";

const redis = require('redis');
const { promisify } = require("util");

const redisHelper = {
  connect () {
    this.client = redis.createClient(`//${process.env.REDIS_HOST}:6379`);
    this.get = promisify(this.client.get).bind(this.client);
    this.set = promisify(this.client.set).bind(this.client);
    this.del = promisify(this.client.del).bind(this.client);
  }
}

exports.connect = async () => {
  redisHelper.connect();
}

exports.getAndRemove = async key => {
  redisHelper.connect();
  const value = await redisHelper.get(key);
  await redisHelper.del(key);
  return value;
}

exports.add = async (key, value) => {
  return redisHelper.set(key, value, 'EX', 60 * 60);
}

exports.get = async key => {
  return redisHelper.get(key);
}

exports.remove = async key => {
  return redisHelper.del(key);
}
