import { UsersHandler } from '../../src/handler';

export class UsersHandlerMock extends UsersHandler {
  public get mongooseService() {
    return {
      connect: (val: string) => {}
    }
  }
}
