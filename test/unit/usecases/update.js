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
        sinon.stub(User, 'updateOne').resolves({ ok: 1 });
      });

      after(() => {
        User.updateOne.restore();
      });

      it('should return success', async () => {
        const result = await updateUsecase({ body: JSON.stringify(user), pathParameters: { _id: '123' }});
        assert(result.success);
      });

      it('should return new user', async () => {
        const result = await updateUsecase({ body: JSON.stringify(user), pathParameters: { _id: '123' }});
        assert.strictEqual(result._id, '123');
      });
    });

    describe('with invalid user', () => {
      let user = validUser();
      user.name = undefined;

      before(() => {
        sinon.stub(User, 'updateOne').rejects({ errors: { name: { properties: { message: 'name_required' }}}});
      });

      after(() => {
        User.updateOne.restore();
      });

      it('should return failure', async () => {
        try {
          await updateUsecase({ body: JSON.stringify(user), pathParameters: { _id: '60e8f0f210be8900082d8b17' }});
        } catch (e) {
          assert.strictEqual(e.success, false);
        }
      });

      it('should return error on name', async () => {
        try {
          await updateUsecase({ body: JSON.stringify(user), pathParameters: { _id: '60e8f0f210be8900082d8b17' }});
        } catch (e) {
          assert.strictEqual(e.error_fields.name, 'name_required');
        }
      });
    });
  });  
});
