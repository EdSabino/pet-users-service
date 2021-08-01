const assert = require('assert');
const AuthorizeUsecase = require('../../../src/usecases/authorize');
const { validUser } = require('../../mocks/User');
const createTokenFromUser = require('../../../src/usecases/token_from_user');

process.env.SECRET = 'segredosecreto';
describe('AuthorizeUsecase', () => {
  describe('#execute', () => {
    const user = validUser();
    user._id = '123';
    const token = createTokenFromUser(user);

    describe('with valid event', () => {
      const event = { authorizationToken: `Bearer ${token}`, methodArn: '123' };

      it('should return principalId', async () => {
        const autho = await AuthorizeUsecase.execute(event);
        assert.strictEqual(autho.principalId, '123');
      });

      it('should return resource', async () => {
        const autho = await AuthorizeUsecase.execute(event);
        assert.strictEqual(autho.policyDocument.Statement[0].Resource, '*');
      });
    });

    describe('without auth token', () => {
      it('should throw `Unauthorized` exception', async () => {
        try {
          await AuthorizeUsecase.execute({});
          assert(false);
        } catch (e) {
          assert.strictEqual(e, 'Unauthorized');
        }
      });
    });

    describe('auth token without bearer', () => {
      const event = { authorizationToken: token, methodArn: '123' };

      it('should throw `Unauthorized` exception', async () => {
        try {
          await AuthorizeUsecase.execute(event);
          assert(false);
        } catch (e) {
          assert.strictEqual(e, 'Unauthorized');
        }
      });
    });

    describe('auth token without tokenValue', () => {
      const event = { authorizationToken: 'Bearer', methodArn: '123' };

      it('should throw `Unauthorized` exception', async () => {
        try {
          await AuthorizeUsecase.execute(event);
          assert(false);
        } catch (e) {
          assert.strictEqual(e, 'Unauthorized');
        }
      });
    });

    describe('auth token invalid', () => {
      const event = { authorizationToken: `Bearer 123123123123123`, methodArn: '123' };

      it('should throw `Unauthorized` exception', async () => {
        try {
          await AuthorizeUsecase.execute(event);
          assert(false);
        } catch (e) {
          assert.strictEqual(e, 'Unauthorized');
        }
      });
    });
  });
});
