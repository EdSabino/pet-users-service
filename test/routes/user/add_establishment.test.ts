import { UsersHandler } from "../../../src/handler";
import { establishment as establishmentMock } from "../../mocks/Establishment.mock";
import { event } from "../../mocks/Event.mock";

describe('UsersHandler', () => {
  describe('#addEstablishment', () => {
    const handler = new UsersHandler();

    beforeEach(() => {
      jest.spyOn(handler.mongooseService, 'connect')
        .mockImplementation(x => {})
    });

    describe('when success', () => {
      let response;
      const userService = handler.services.userService;
      const eventParam = event({
        body: JSON.stringify(establishmentMock())
      });

      beforeEach(async () => {
        jest.spyOn(userService.model, 'updateOne')
          .mockImplementation(() => ({ ok: 1 }));
        
        response = await handler.addEstablishment(eventParam, {}, {});
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
        expect(JSON.parse(response.body)).toEqual({
          success: true
        });
      });
    });

    describe('when fail', () => {
      describe('invalid animal', () => {
        let response;
        const eventParam = event({
          body: JSON.stringify(establishmentMock({
            name: undefined
          }))
        });

        beforeEach(async () => {
          response = await handler.addEstablishment(eventParam, {}, {});
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
            ]
          });
        });
      });

      describe('not found', () => {
        let response;
        const eventParam = event({
          body: JSON.stringify(establishmentMock())
        });

        beforeEach(async () => {
          jest.spyOn(handler.services.userService.model, 'updateOne')
            .mockImplementation(() => ({ ok: 0 }));

          response = await handler.addEstablishment(eventParam, {}, {});
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
