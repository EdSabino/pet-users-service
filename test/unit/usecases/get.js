const assert = require('assert');
const sinon = require('sinon');
const getUsecase = require('../../../src/usecases/get');
const { validUser } = require('../../mocks/User');
const User = require('../../../src/ports/models/User');

describe('get', () => {
  describe('#exec', () => {
    describe('with valid _id', () => {
      const user = validUser();

      before(() => {
        sinon.stub(User, 'findOne').resolves(user);
      });

      after(() => {
        User.findOne.restore();
      });

      it('should return success', async () => {
        const result = await getUsecase({ pathParameters: '' });
        assert(result.success);
      });

      it('should return user', async () => {
        const result = await getUsecase({ pathParameters: '' });
        assert.strictEqual(result.user, user);
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
        const result = await getUsecase({ pathParameters: '' });
        assert.strictEqual(result.success, false);
      });

      it('should return error on name', async () => {
        const result = await getUsecase({ pathParameters: '' });
        assert.strictEqual(result.message, 'user_not_found');
      });
    });
  });  
});
