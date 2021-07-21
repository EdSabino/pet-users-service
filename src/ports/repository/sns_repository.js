"use strict";

const aws = require('aws-sdk');

const sns = new aws.SNS({
  region: 'us-east-1'
});

exports.publishMessage = async (topic, message) => sns
  .publish({
    Message: JSON.stringify(message),
    TopicArn: topic
  })
  .promise()
  .catch((e) => console.log(e));

