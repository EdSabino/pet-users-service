import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { EstablishmentDto } from '../../src/dto/establishment.dto';
import { establishment as establishmentMock } from "../mocks/Establishment.mock";

describe('EstablishmentDto', () => {
  describe('when valid', () => {
    let errors;
    const establishment = plainToClass(EstablishmentDto, establishmentMock());

    beforeEach(async () => {
      errors = await validate(establishment);
    });

    it('dosnt has errors', () => {
      expect(errors).toEqual([]);
    })
  });

  describe('when invalid', () => {
    let errors;
    const establishment = plainToClass(EstablishmentDto, {});

    beforeEach(async () => {
      errors = await validate(establishment);
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

    it('has errors on address', () => {
      expect(errors).toContainEqual({
        children: [],
        constraints: {
          isNotEmpty: 'address should not be empty',
          isString: 'address must be a string'
        },
        property: 'address',
        target: {},
        value: undefined
      });
    });
  });
});
