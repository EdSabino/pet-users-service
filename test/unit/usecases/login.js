const assert = require('assert');
const sinon = require('sinon');
const loginUsecase = require('../../../src/usecases/login');
const { validUser, loginUser } = require('../../mocks/User');
const User = require('../../../src/ports/models/User');
const jwt = require('jsonwebtoken');

process.env.SECRET = 'segredosecreto';

describe('login', () => {
  describe('#exec', () => {
    describe('with valid user', () => {
      const localUser = loginUser();
      
      beforeEach(async () => {
        const user = validUser();
        sinon.stub(User, 'findOne').resolves(user);
      });

      afterEach(() => {
        User.findOne.restore();
      });

      it('should return success', async () => {
        const result = await loginUsecase({ body: JSON.stringify(localUser) });
        assert(result.success);
      });

      it('should return new user', async () => {
        const result = await loginUsecase({ body: JSON.stringify(localUser) });
        jwt.verify(result.token, process.env.SECRET, (err) => {
          assert(!err)
        });
      });

      
    });

    describe('when wrong password', () => {
      const localUser = loginUser();
      let user = validUser();

      beforeEach(async () => {
        localUser.password = '123';
        sinon.stub(User, 'findOne').resolves(user);
      });

      afterEach(() => {
        User.findOne.restore();
      });

      it('should return error', async () => {
        try {
          await loginUsecase({ body: JSON.stringify(localUser) });
        } catch (e) {
          assert(!e.success);
        }
      });

      it('should return error', async () => {
        try {
          await loginUsecase({ body: JSON.stringify(localUser) });
        } catch (e) {
          assert.strictEqual(e.message, 'wrong_password');
        }
      });
    });

    describe('when wrong email', () => {
      const localUser = loginUser();

      beforeEach(() => {
        localUser.password = '123';
        sinon.stub(User, 'findOne').resolves(null);
      });

      afterEach(() => {
        User.findOne.restore();
      });

      it('should return error', async () => {
        try {
          await loginUsecase({ body: JSON.stringify(localUser) });
        } catch (e) {
          assert(!e.success);
        }
      });

      it('should return error message', async () => {
        try {
          await loginUsecase({ body: JSON.stringify(localUser) });
        } catch (e) {
          assert.strictEqual(e.message, 'user_not_found');
        }
      });
    });

    describe('when wrong email not confirmed', () => {
      const localUser = loginUser();

      beforeEach(() => {
        localUser.email_confirmed = false;
        sinon.stub(User, 'findOne').resolves(validUser());
      });

      afterEach(() => {
        User.findOne.restore();
      });

      it('should return error', async () => {
        try {
          await loginUsecase({ body: JSON.stringify(localUser) });
        } catch (e) {
          assert(!e.success);
        }
      });

      it('should return error message', async () => {
        try {
          await loginUsecase({ body: JSON.stringify(localUser) });
        } catch (e) {
          assert.strictEqual(e.message, 'email_not_confirmed');
        }
      });
    });
  });  
});
