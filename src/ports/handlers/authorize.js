const AuthorizeUsecase = require('../../usecases/authorize');

async function authorize(event, context, callback) {
  try {
    const res = await AuthorizeUsecase.execute(event);
    console.log(res)
    return res;
  } catch (err) {
    console.log(err)
    throw Error(err);
  }
}

module.exports = authorize;
  