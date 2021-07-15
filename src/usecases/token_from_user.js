
const jwt = require('jsonwebtoken');

const createTokenFromUser = user => {
  delete user.password;
  delete user.__v;
  return jwt.sign(user.toObject(), process.env.SECRET, { expiresIn: '1h' });
}

module.exports = createTokenFromUser;
