const assert = require('assert');
const sinon = require('sinon');
const { execute } = require('../../../src/usecases/confirm_email');
const { validUser } = require('../../mocks/User');
const User = require('../../../src/ports/models/User');
const cache = require('../../../src/ports/repository/cache_repository');

describe('confirm_email', () => {
  describe('#exec', () => {
    describe('with valid email', () => {
      const user = validUser();

      before(() => {
        sinon.stub(User, 'findOneAndUpdate').resolves(user);
        sinon.stub(cache, 'getAndRemove').resolves('123');
      });

      after(() => {
        User.findOneAndUpdate.restore();
        cache.getAndRemove.restore();
      });

      it('should return success', async () => {
        const result = await execute({ pathParameters: { uuid: '' }});
        assert(result.success);
      });

      it('should return user', async () => {
        const result = await execute({ pathParameters: { uuid: '' }});
        assert.strictEqual(result._id, user._id);
      });
    });

    describe('with invalid email', () => {
      before(() => {
        sinon.stub(User, 'findOneAndUpdate').resolves(null);
        sinon.stub(cache, 'getAndRemove').resolves('123');
      });

      after(() => {
        User.findOneAndUpdate.restore();
        cache.getAndRemove.restore();
      });

      it('should return failure', async () => {
        try {
          await execute({ pathParameters: { uuid: '' }});
          assert(false);
        } catch (e) {
          assert.strictEqual(e.success, false);
        }
      });

      it('should return error on name', async () => {
        try {
          await execute({ pathParameters: { uuid: '' }});
          assert(false);
        } catch (e) {
          assert.strictEqual(e.message, 'user_not_found');
        }
      });
    });
  });  
});
