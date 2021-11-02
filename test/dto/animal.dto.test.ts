import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { AnimalDto } from '../../src/dto/animal.dto';

describe('AnimalDto', () => {
  describe('when invalid', () => {
    const animal = plainToClass(AnimalDto, {});

    it('raises the predicted errors', async () => {
      expect(await validate(animal)).toEqual( [
        {
          children: [],
          constraints: {
            isNotEmpty: 'name should not be empty',
            isString: 'name must be a string'
          },
          property: 'name',
          target: {},
          value: undefined
        }, {
          children: [],
          constraints: {
            isEnum: 'animal_type must be a valid enum value'
          },
          property: 'animal_type',
          target: {},
          value: undefined
        }, {
          children: [],
          constraints: {
            isEnum: 'hair must be a valid enum value'
          },
          property: 'hair', 
          target: {},
          value: undefined
        }, {
          children: [],
          constraints: {
            isEnum: 'size must be a valid enum value'
          },
          property: 'size', 
          target: {},
          value: undefined
        }
      ]);
    });
  });
});
