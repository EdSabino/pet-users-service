const assert = require('assert');
const sinon = require('sinon');
const updateUsecase = require('../../../src/usecases/update');
const { validUser } = require('../../mocks/User');
const User = require('../../../src/ports/models/User');

describe('update', () => {
  describe('#exec', () => {
    describe('with valid user', () => {
      let user = validUser();

      before(() => {
        sinon.stub(User, 'updateOne').resolves(user);
      });

      after(() => {
        User.updateOne.restore();
      });

      it('should return success', async () => {
        const result = await updateUsecase({ body: user, pathParameters: { _id: '123' }});
        assert(result.success);
      });

      it('should return new user', async () => {
        const result = await updateUsecase({ body: user, pathParameters: { _id: '123' }});
        assert.strictEqual(result.user, user);
      });
    });

    describe('with invalid user', () => {
      let user = validUser();
      user.name = undefined;

      before(() => {
        sinon.stub(User, 'create').rejects({ errors: { name: { properties: { message: 'name_required' }}}});
      });

      after(() => {
        User.create.restore();
      });

      it('should return failure', async () => {
        try {
          await updateUsecase({ body: user, pathParameters: { _id: '123' }});
        } catch (e) {
          assert.strictEqual(e.success, false);
        }
      });

      it('should return error on name', async () => {
        try {
          await updateUsecase({ body: user, pathParameters: { _id: '123' }});
        } catch (e) {
          assert.strictEqual(e.error_fields.name, 'name_required');
        }
      });
    });
  });  
});
