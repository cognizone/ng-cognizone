import { matchPhrasePrefixQuery } from './match-phrase-prefix';

describe('MatchPhrasePrefixQuery', () => {
  describe('matchPhrasePrefixQuery', () => {
    it('should create a basic match phrase prefix query', () => {
      const result = matchPhrasePrefixQuery('field', 'test query');
      expect(result).toEqual({
        match_phrase_prefix: {
          field: {
            query: 'test query',
          },
        },
      });
    });

    it('should create a match phrase prefix query with options', () => {
      const result = matchPhrasePrefixQuery('field', 'test query', {
        analyzer: 'standard',
        max_expansions: 50,
        slop: 2,
        zero_terms_query: 'none',
        _name: 'test',
      });
      expect(result).toEqual({
        _name: 'test',
        match_phrase_prefix: {
          field: {
            query: 'test query',
            analyzer: 'standard',
            max_expansions: 50,
            slop: 2,
            zero_terms_query: 'none',
          },
        },
      });
    });
  });
});
