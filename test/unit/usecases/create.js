const assert = require('assert');
const sinon = require('sinon');
const createUsecase = require('../../../src/usecases/create');
const { validUser } = require('../../mocks/User');
const User = require('../../../src/ports/models/User');
const cache = require('../../../src/ports/repository/cache_repository');

describe('create', () => {
  describe('#exec', () => {
    describe('with valid user', () => {
      let user = validUser();
      const body = { body: JSON.stringify(user) };

      before(() => {
        sinon.stub(User, 'create').resolves({ email: user.email, _id: '123' });
        sinon.stub(cache, 'add').resolves();
      });

      after(() => {
        User.create.restore();
        cache.add.restore();
      });

      it('should return success', async () => {
        const result = await createUsecase(body);
        assert(result.success);
      });

      it('should return _id', async () => {
        const result = await createUsecase(body);
        assert.strictEqual(result._id, '123');
      });
    });

    describe('with invalid user', () => {
      let user = validUser();
      user.name = undefined;
      const body = { body: JSON.stringify(user) };

      before(() => {
        sinon.stub(User, 'create').rejects({ errors: { name: { properties: { message: 'name_required' }}}});
      });

      after(() => {
        User.create.restore();
      });

      it('should return failure', async () => {
        try {
          await createUsecase(body);
        } catch (e) {
          assert.strictEqual(e.success, false);
        }
      });

      it('should return error on name', async () => {
        try {
          await createUsecase(body);
        } catch (e) {
          assert.strictEqual(e.error_fields.name, 'name_required');
        }
      });
    });
  });  
});
