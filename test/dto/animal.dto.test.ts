import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { AnimalDto } from '../../src/dto/animal.dto';

describe('AnimalDto', () => {
  describe('when invalid', () => {
    let errors;
    const animal = plainToClass(AnimalDto, {});

    beforeEach(async () => {
      errors = await validate(animal);
    });

    it('has errors on name', () => {
      expect(errors).toContainEqual({
        children: [],
        constraints: {
          isNotEmpty: 'name should not be empty',
          isString: 'name must be a string'
        },
        property: 'name',
        target: {},
        value: undefined
      });
    });

    it('has errors on animal_type', () => {
      expect(errors).toContainEqual({
        children: [],
        constraints: {
          isEnum: 'animal_type must be a valid enum value'
        },
        property: 'animal_type',
        target: {},
        value: undefined
      });
    });
    
    it('has errors on hair', () => {
      expect(errors).toContainEqual({
        children: [],
        constraints: {
          isEnum: 'hair must be a valid enum value'
        },
        property: 'hair', 
        target: {},
        value: undefined
      });
    });

        
    it('has errors on size', () => {
      expect(errors).toContainEqual({
        children: [],
        constraints: {
          isEnum: 'size must be a valid enum value'
        },
        property: 'size', 
        target: {},
        value: undefined
      });
    });
  });
});
