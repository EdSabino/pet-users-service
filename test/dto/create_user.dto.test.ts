import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UserDto } from '../../src/dto/create_user.dto';
import { user as userMock } from '../mocks/User.mock';

describe('CreateUserDto', () => {

  describe('when valid', () => {
    const user = plainToClass(UserDto, userMock());

    it('validates successfully', async () => {
      expect(await validate(user)).toEqual([]);
    });
  });

  describe('when invalid', () => {
    const user = plainToClass(UserDto, {});

    it('raises the predicted errors', async () => {
      expect(await validate(user)).toEqual([
        {
          children: [],
          constraints: {
            isNotEmpty: 'name should not be empty',
            isString: 'name must be a string'
          }, 
          property: 'name', 
          'target': {}, 'value': undefined
        },
        {
          children: [],
          constraints: {
            isEmail: 'email must be an email',
            isString: 'email must be a string'
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
