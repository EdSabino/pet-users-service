const assert = require('assert');
const sinon = require('sinon');
const confirmEmailUsecase = require('../../../src/usecases/confirm_email');
const { validUser } = require('../../mocks/User');
const User = require('../../../src/ports/models/User');
const cache = require('../../../src/ports/repository/cache_repository');

describe('confirm_email', () => {
  describe('#exec', () => {
    describe('with valid email', () => {
      const user = validUser();

      before(() => {
        sinon.stub(User, 'findOneAndUpdate').resolves(user);
        sinon.stub(cache, 'get').resolves('123');
      });

      after(() => {
        User.findOneAndUpdate.restore();
        cache.get.restore();
      });

      it('should return success', async () => {
        const result = await confirmEmailUsecase({ pathParameters: { email: '' }});
        assert(result.success);
      });

      it('should return user', async () => {
        const result = await confirmEmailUsecase({ pathParameters: { email: '' }});
        assert.strictEqual(result._id, user._id);
      });
    });

    describe('with invalid email', () => {
      before(() => {
        sinon.stub(User, 'findOneAndUpdate').resolves(null);
        sinon.stub(cache, 'get').resolves('123');
      });

      after(() => {
        User.findOneAndUpdate.restore();
        cache.get.restore();
      });

      it('should return failure', async () => {
        try {
          await confirmEmailUsecase({ pathParameters: { email: '' }});
          assert(false);
        } catch (e) {
          assert.strictEqual(e.success, false);
        }
      });

      it('should return error on name', async () => {
        try {
          await confirmEmailUsecase({ pathParameters: { email: '' }});
          assert(false);
        } catch (e) {
          assert.strictEqual(e.message, 'user_not_found');
        }
      });
    });
  });  
});
