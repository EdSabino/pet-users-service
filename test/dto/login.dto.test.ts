import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { LoginDto } from '../../src/dto/login.dto';

describe('LoginDto', () => {
  describe('when invalid', () => {
    const login = plainToClass(LoginDto, {});

    it('raises the predicted errors', async () => {
      expect(await validate(login)).toEqual([
        {
          children: [],
          constraints: {
            isEmail: 'email must be an email',
            isString: 'email must be a string',
            isNotEmpty: 'email should not be empty'
          },
          property: 'email',
          target: {},
          value: undefined
        }, {
          children: [],
          constraints: {
            isNotEmpty: 'password should not be empty',
            isString: 'password must be a string',
            minLength: 'password must be longer than or equal to 8 characters'
          },
          property: 'password',
          target: {},
          value: undefined
        }
      ]);
    });
  });
});
