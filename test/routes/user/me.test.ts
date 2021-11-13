import { UsersHandler } from "../../../src/handler";
import { event } from "../../mocks/Event.mock";
import { user as userMock } from "../../mocks/User.mock";

describe('UsersHandler', () => {
  describe('#me', () => {
    const handler = new UsersHandler();

    beforeEach(() => {
      jest.spyOn(handler.mongooseService, 'connect')
        .mockImplementation(x => {})
    });

    describe('when success', () => {
      let response;
      const mockedFind = jest.fn(x => ({ toObject: () => ({ _id: x._id, ...userMock() })}))
      const userService = handler.services.userService;
      const eventParam = event();

      beforeEach(async () => {
        jest.spyOn(userService.model, 'findOne')
          .mockImplementation(mockedFind);
        
        response = await handler.me(eventParam, {}, {});
      });

      it('returns 200 statusCode', async () => {
        expect(response.statusCode).toEqual(200);
      });

      it('returns cors headers', async () => {
        expect(response.headers).toEqual({
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*',
        });
      });

      it('returns success body', async () => {
        const body = JSON.parse(response.body);
        expect(body.success).toBeTruthy();
      });

      it('dispatches email to created user', () => {
        const body = JSON.parse(response.body);
        expect(body.user).toEqual({ _id: '1324', ...userMock() });
      });
    });
  });
});
