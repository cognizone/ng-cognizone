import { termsQuery } from './terms-query';

describe('TermsQuery', () => {
  describe('termsQuery', () => {
    it('should create a terms query with values', () => {
      const result = termsQuery('field', ['value1', 'value2']);
      expect(result).toEqual({
        terms: {
          field: ['value1', 'value2'],
        },
      });
    });

    it('should create a terms query with options', () => {
      const result = termsQuery('field', ['value1', 'value2'], {
        boost: 2,
        case_insensitive: true,
        _name: 'test',
      });
      expect(result).toEqual({
        _name: 'test',
        terms: {
          field: ['value1', 'value2'],
          boost: 2,
          case_insensitive: true,
        },
      });
    });
  });
});
