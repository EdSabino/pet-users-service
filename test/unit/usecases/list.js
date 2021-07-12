const assert = require('assert');
const sinon = require('sinon');
const listUsecase = require('../../../src/usecases/list');
const { validUser } = require('../../mocks/User');
const User = require('../../../src/ports/models/User');

describe('list', () => {
  describe('#exec', () => {
    describe('with page 2', () => {
      before(() => {
        sinon.stub(User, 'find').resolves([]);
      });

      after(() => {
        User.find.restore();
      });

      it('should return success', async () => {
        const result = await listUsecase({ queryStringParameters: { page: 2 } });
        assert(result.success);
      });

      it('should return docs', async () => {
        const result = await listUsecase({ queryStringParameters: { page: 2 } });
        assert.strictEqual(result.docs.length, 0);
      });

      it('should return page', async () => {
        const result = await listUsecase({ queryStringParameters: { page: 2 } });
        assert.strictEqual(result.paginate.page, 2);
        assert.strictEqual(result.paginate.count, 10);
      })
    });
  });  
});
