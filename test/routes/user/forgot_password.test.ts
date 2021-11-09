import { UsersHandler } from "../../../src/handler";
import { event } from "../../mocks/Event.mock";
import { userEvent, user as userMock } from "../../mocks/User.mock";

describe('UsersHandler', () => {
  describe('#forgotPassword', () => {
    const handler = new UsersHandler();

    beforeEach(() => {
      jest.spyOn(handler.mongooseService, 'connect')
        .mockImplementation(x => {})
    });

    describe('when success', () => {
      let response, dispatchEmailMock, cacheUuidMock;
      const userService = handler.services.userService;
      const eventParam = userEvent();

      beforeEach(async () => {
        dispatchEmailMock = jest.fn((_, __, params) => params.uuid);
        cacheUuidMock = jest.fn((uuid, id) => uuid);

        jest.spyOn(userService.services.emailRepository, 'dispatch')
          .mockImplementation(dispatchEmailMock);

        jest.spyOn(userService.services.cache, 'add')
          .mockImplementation(cacheUuidMock);

        jest.spyOn(userService.model, 'findOne')
          .mockImplementation(() => ({ _id: 42, ...userMock() }));
        
        response = await handler.forgotPassword(eventParam, {});
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

      it('returns cached uuid', async () => {
        const body = JSON.parse(response.body);
        expect(body.uuid).toEqual(cacheUuidMock.mock.calls[0][0]);
      });

      it('dispatches new_user email event', () => {
        expect(dispatchEmailMock.mock.calls[0][0]).toEqual('forgot_password');
      });

      it('dispatches email to created user', () => {
        expect(dispatchEmailMock.mock.calls[0][1]).toEqual('eduardoaikin@gmail.com');
      });

      it('dispatches email with uuid saved on cache', () => {
        expect(dispatchEmailMock.mock.calls[0][2]).toEqual({ uuid: cacheUuidMock.mock.calls[0][0] });
      });

      it('caches user id', () => {
        expect(cacheUuidMock.mock.calls[0][1]).toEqual('42');
      });
    });

    describe('when fail', () => {
      describe('invalid email', () => {
        let response;
        const eventParam = event({ pathParameters: { email: 'invalidEmail' }});

        beforeEach(async () => {
          jest.spyOn(handler.services.userService.model, 'findOne')
            .mockImplementation(() => null);

          response = await handler.forgotPassword(eventParam, {});
        });

        it('returns 404 statusCode', async () => {
          expect(response.statusCode).toEqual(404);
        });

        it('returns cors headers', async () => {
          expect(response.headers).toEqual({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
          });
        });

        it('returns errors body', async () => {
          expect(JSON.parse(response.body)).toEqual({
            success: false,
            message: 'user_not_found'
          });
        });
      });
    });
  });
});
