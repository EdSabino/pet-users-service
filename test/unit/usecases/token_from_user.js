const assert = require('assert');
const tokenFromUser = require('../../../src/usecases/token_from_user');
const { validUser } = require('../../mocks/User');
const jwt = require('jsonwebtoken');

describe('token_from_user', () => {
  describe('#exec', () => {
    const user = validUser();

    describe('with valid user', () => {
      it('should valid jwt', async () => {
        const result = tokenFromUser(user);
        jwt.verify(result, process.env.SECRET, (err) => {
          assert(!err)
        });
      });

      it('should decode to same user name', async () => {
        const result = tokenFromUser(user);
        jwt.verify(result, process.env.SECRET, (err, decode) => {
          assert.strictEqual(decode.name, user.name)
        });
      });

      it('should decode to same user email', async () => {
        const result = tokenFromUser(user);
        jwt.verify(result, process.env.SECRET, (err, decode) => {
          assert.strictEqual(decode.email, user.email)
        });
      });
    });
  });  
});
