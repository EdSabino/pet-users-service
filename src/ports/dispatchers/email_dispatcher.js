"use strict";

const snsRepository = require('../repository/sns_repository');

module.exports = async (template, to, locals) => {
  await snsRepository.publishMessage(process.env.SNS_TOPIC_EMAIL, {
    template,
    to,
    locals
  });
}
