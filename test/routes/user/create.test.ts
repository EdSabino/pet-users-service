import { UsersHandler } from "../../../src/handler";
import { event } from "../../mocks/Event.mock";
import { userEvent, user as userMock } from "../../mocks/User.mock";

describe('UsersHandler', () => {
  describe('#create', () => {
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

        jest.spyOn(userService.model, 'create')
          .mockImplementation(() => ({ _id: 42, ...userMock() }));
        
        response = await handler.create(eventParam, {}, {});
      });

      it('returns 201 statusCode', async () => {
        expect(response.statusCode).toEqual(201);
      });

      it('returns cors headers', async () => {
        expect(response.headers).toEqual({
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*',
        });
      });

      it('returns success body', async () => {
        expect(JSON.parse(response.body)).toEqual({
          success: true,
          _id: '42'
        });
      });

      it('dispatches new_user email event', () => {
        expect(dispatchEmailMock.mock.calls[0][0]).toEqual('new_user');
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
      describe('invalid body', () => {
        let response;
        const eventParam = event({ body: '{}' });

        beforeEach(async () => {
          response = await handler.create(eventParam, {}, {});
        });

        it('returns 400 statusCode', async () => {
          expect(response.statusCode).toEqual(400);
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
            errors: [
              {
                field: 'name',
                failures: ['isNotEmpty', 'isString']
              },
              {
                field: 'email',
                failures: ['isNotEmpty', 'isEmail', 'isString']
              },
              {
                field: 'password',
                failures: ['minLength', 'isNotEmpty', 'isString']
              }
            ]
          });
        });
      });
    });
  });
});
