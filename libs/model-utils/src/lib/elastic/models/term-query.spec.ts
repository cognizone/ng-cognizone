import { termQuery } from './term-query';

describe('TermQuery', () => {
  describe('termQuery', () => {
    it('should create a term query with simple value', () => {
      const result = termQuery('field', 'value');
      expect(result).toEqual({
        term: {
          field: {
            value: 'value',
          },
        },
      });
    });

    it('should create a term query with options', () => {
      const result = termQuery('field', 'value', {
        boost: 2,
        case_insensitive: true,
        _name: 'test',
      });
      expect(result).toEqual({
        _name: 'test',
        term: {
          field: {
            value: 'value',
            boost: 2,
            case_insensitive: true,
          },
        },
      });
    });
  });
});
