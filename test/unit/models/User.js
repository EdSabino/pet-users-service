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
});
