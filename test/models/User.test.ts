import User from "../../src/models/User";
import { user } from "../mocks/User.mock";

describe('User', () => {
  describe('with valid establishment', () => {
    const userMock = new User(user());

    it('must be valid', () => {
      const error = userMock.validateSync();
      expect(error).toBe(undefined);
    });
  });

  describe('with invalid establishment', () => {
    
    it('must have name_required error', () => {
      const userMock = new User(user());
      userMock.name = '';

      const error = userMock.validateSync();
      expect(error?.errors?.name?.message).toBe('name_required');
    });

    it('must have email_required error', () => {
      const userMock = new User(user());
      userMock.email = '';

      const error = userMock.validateSync();
      expect(error?.errors?.email?.message).toBe('email_required');
    });

    it('must have invalid_email error', () => {
      const userMock = new User(user());
      userMock.email = 'edasdasda';

      const error = userMock.validateSync();
      expect(error?.errors?.email?.message).toBe('invalid_email');
    });

    it('must have invalid_email error', () => {
      const userMock = new User(user());
      userMock.password = '';

      const error = userMock.validateSync();
      expect(error?.errors?.password?.message).toBe('password_required');
    });
  });
});
