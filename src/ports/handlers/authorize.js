const AuthorizeUsecase = require('../../usecases/authorize');

function authorize(event, context, callback) {
  AuthorizeUsecase.execute(event).then(result => callback(null, result)).catch(err => callback(err));
}

module.exports = authorize;
  