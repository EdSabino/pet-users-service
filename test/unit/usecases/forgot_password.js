const assert = require('assert');
const sinon = require('sinon');

const forgotPasswordUseCase = require('../../../src/usecases/forgot_password');
const { validUser } = require('../../mocks/User');
const User = require('../../../src/ports/models/User');
const cache = require('../../../src/ports/repository/cache_repository');

describe('forgotPassword', () => {
  describe('#exec', () => {
    describe('with valid user', () => {
      const user = validUser();
      const params = { pathParameters: { email: user.email }};

      before(() => {
        sinon.stub(User, 'findOne').resolves({ email: user.email, _id: '123' });
        sinon.stub(cache, 'add').resolves();
      });

      after(() => {
        User.findOne.restore();
        cache.add.restore();
      });

      it('should return success', async () => {
        const result = await forgotPasswordUseCase(params);
        assert(result.success);
      });

      it('should return _id', async () => {
        const result = await forgotPasswordUseCase(params);
        assert.strictEqual(typeof result.uuid, 'string');
      });
    });

    describe('with invalid user', () => {
      const user = validUser();
      const params = { pathParameters: { email: user.email }};

      before(() => {
        sinon.stub(User, 'findOne').resolves(null);
      });

      after(() => {
        User.findOne.restore();
      });

      it('should return failure', async () => {
        try {
          await forgotPasswordUseCase(params);
        } catch (e) {
          assert.strictEqual(e.success, false);
        }
      });

      it('should return user_not_found', async () => {
        try {
          await forgotPasswordUseCase(params);
        } catch (e) {
          assert.strictEqual(e.message, 'user_not_found');
        }
      });
    });
  });  
});
