"use strict";

exports.handler = async (usecase, success, failure) => {
  return async (event) => {
    try {
      const res = await usecase.execute(event);
      return {
        statusCode: success,
        body: JSON.stringify(res)
      }
    } catch (err) {
      return {
        statusCode: failure,
        body: JSON.stringify(err)
      }
    }
  }
}
