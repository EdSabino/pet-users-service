const assert = require('assert');
const sinon = require('sinon');
const { execute } = require('../../../src/usecases/recycle');
const { validUser } = require('../../mocks/User');
const User = require('../../../src/ports/models/User');
const jwt = require('jsonwebtoken');

describe('recycle', () => {
  describe('#exec', () => {
    const user = validUser();
    const req = { requestContext: { authorizer: { claims: user }}}

    describe('with valid auth', () => {

      before(() => {
        sinon.stub(User, 'findOne').resolves(user);
      });

      after(() => {
        User.findOne.restore();
      });

      it('should return success', async () => {
        const result = await execute(req);
        assert(result.success);
      });

      it('should return user', async () => {
        const result = await execute(req);
        jwt.verify(result.token, process.env.SECRET, (err) => {
          assert(!err)
        });
      });
    });

    describe('with invalid user', () => {
      before(() => {
        sinon.stub(User, 'findOne').resolves(null);
      });

      after(() => {
        User.findOne.restore();
      });

      it('should return failure', async () => {
        try {
          await execute(req)
        } catch (e) {
          assert.strictEqual(e.success, false);
        }
      });

      it('should return error on name', async () => {
        try {
          await execute(req)
        } catch (e) {
          assert.strictEqual(e.message, 'user_not_found');
        }
      });
    });
  });  
});
