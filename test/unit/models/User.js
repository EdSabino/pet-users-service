const assert = require('assert');

const User = require('../../../src/ports/models/User');
const { validUser } = require('../../mocks/User');

describe('User', () => {
  let user = null;
  beforeEach(() => {
    user = new User(validUser());
  });

  describe('#validate', () => {
    it('should be valid', async () => {
      assert.strictEqual(user.validateSync(), undefined);
    });
  });

  describe('#comparePassword', () => {
    describe('when original not hashed', () => {
      it('should be different', async () => {
        assert.notStrictEqual(user.comparePassword(user.password), false);
      });
    });

    describe('when original is hashed', () => {
      beforeEach(() => {
        user.password = user.hashPassword();
      });

      it('should be equal', async () => {
        assert.notStrictEqual(user.comparePassword(user.password), false);
      });
    });
  });
});
