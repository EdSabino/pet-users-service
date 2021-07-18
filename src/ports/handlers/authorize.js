const AuthorizeUsecase = require('../../usecases/authorize');

async function authorize(event, context, callback) {
  try {
    const res = await AuthorizeUsecase.execute(event);
    return callback(null, res);
  } catch (err) {
    return callback(err);
  }
}

module.exports = authorize;
  