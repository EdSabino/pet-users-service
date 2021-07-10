const assert = require('assert');
const sinon = require('sinon');
const loginUsecase = require('../../../src/usecases/login');
const { validUser } = require('../../mocks/User');
const User = require('../../../src/ports/models/User');
const jwt = require('jsonwebtoken');

process.env.SECRET = 'segredosecreto';

describe('login', () => {
  describe('#exec', () => {
    describe('with valid user', () => {
      const localUser = validUser();
      let user = validUser();

      before(async () => {
        await user.hashPassword();
        sinon.stub(User, 'findOne').resolves(user);
      });

      after(() => {
        User.findOne.restore();
      });

      it('should return success', async () => {
        const result = await loginUsecase({ body: localUser });
        assert(result.success);
      });

      it('should return new user', async () => {
        const result = await loginUsecase({ body: localUser });
        jwt.verify(result.token, process.env.SECRET, (err) => {
          console.log(err)
          assert(!err)
        });
      });

      
    });

    describe('when wrong password', () => {
      const localUser = validUser();
      let user = validUser();

      before(async () => {
        localUser.password = '123';
        await user.hashPassword();
        sinon.stub(User, 'findOne').resolves(user);
      });

      after(() => {
        User.findOne.restore();
      });

      it('should return error', async () => {
        const result = await loginUsecase({ body: localUser });
        assert(!result.success);
      });

      it('should return error', async () => {
        const result = await loginUsecase({ body: localUser });
        assert.strictEqual(result.message, 'wrong_password');
      });
    });

    describe('when wrong email', () => {
      const localUser = validUser();
      let user = validUser();

      before(() => {
        localUser.password = '123';
        user.hashPassword();
        sinon.stub(User, 'findOne').resolves(null);
      });

      after(() => {
        User.findOne.restore();
      });

      it('should return error', async () => {
        const result = await loginUsecase({ body: localUser });
        assert(!result.success);
      });

      it('should return error', async () => {
        const result = await loginUsecase({ body: localUser });
        assert.strictEqual(result.message, 'user_not_found');
      });
    });
  });  
});
