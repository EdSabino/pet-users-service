const assert = require('assert');

const User = require('../../../src/ports/models/User');
const { validUser, loginUser } = require('../../mocks/User');

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
    it('should compare the same origin string as equal', async () => {
      assert(await user.comparePassword(loginUser().password));
    });

    it('should compare anything else as diff', async () => {
      assert(!(await user.comparePassword('asd')));
    });
  });

  describe('#publicFields', () => {
    it('should not have password', async () => {
      assert(!User.publicFields().split(' ').includes('password'));
    });

    it('should have _id', async () => {
      assert(User.publicFields().split(' ').includes('_id'));
    });

    it('should have name', async () => {
      assert(User.publicFields().split(' ').includes('name'));
    });

    it('should have email', async () => {
      assert(User.publicFields().split(' ').includes('email'));
    });
  });
});
