const AuthorizeUsecase = require('../../usecases/authorize');

async function authorize(event, context, callback) {
  try {
    const res = await AuthorizeUsecase.execute(event);
    return res;
  } catch (err) {
    throw err;
  }
}

module.exports = authorize;
  