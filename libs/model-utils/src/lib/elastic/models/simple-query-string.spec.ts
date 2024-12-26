import { simpleQueryStringQuery } from './simple-query-string';

describe('SimpleQueryStringQuery', () => {
  describe('simpleQueryStringQuery', () => {
    it('should create a basic simple query string query', () => {
      const result = simpleQueryStringQuery(['field1', 'field2'], 'test query');
      expect(result).toEqual({
        simple_query_string: {
          query: 'test query',
          fields: ['field1', 'field2'],
        },
      });
    });

    it('should create a simple query string query with undefined fields', () => {
      const result = simpleQueryStringQuery(undefined, 'test query');
      expect(result).toEqual({
        simple_query_string: {
          query: 'test query',
          fields: undefined,
        },
      });
    });

    it('should create a simple query string query with single flag', () => {
      const result = simpleQueryStringQuery(['field1'], 'test query', {
        flags: 'AND',
      });
      expect(result).toEqual({
        simple_query_string: {
          query: 'test query',
          fields: ['field1'],
          flags: 'AND',
        },
      });
    });

    it('should create a simple query string query with multiple flags', () => {
      const result = simpleQueryStringQuery(['field1'], 'test query', {
        flags: ['AND', 'OR', 'NOT'],
      });
      expect(result).toEqual({
        simple_query_string: {
          query: 'test query',
          fields: ['field1'],
          flags: 'AND|OR|NOT',
        },
      });
    });

    it('should create a simple query string query with all options', () => {
      const result = simpleQueryStringQuery(['field1', 'field2'], 'test query', {
        default_operator: 'AND',
        analyze_wildcard: true,
        analyzer: 'standard',
        auto_generate_synonyms_phrase_query: true,
        flags: ['AND', 'OR'],
        fuzzy_max_expansions: 50,
        fuzzy_prefix_length: 2,
        fuzzy_transpositions: true,
        lenient: true,
        minimum_should_match: 2,
        quote_field_suffix: '.exact',
        boost: 2,
        _name: 'test',
      });
      expect(result).toEqual({
        _name: 'test',
        simple_query_string: {
          query: 'test query',
          fields: ['field1', 'field2'],
          default_operator: 'AND',
          analyze_wildcard: true,
          analyzer: 'standard',
          auto_generate_synonyms_phrase_query: true,
          flags: 'AND|OR',
          fuzzy_max_expansions: 50,
          fuzzy_prefix_length: 2,
          fuzzy_transpositions: true,
          lenient: true,
          minimum_should_match: 2,
          quote_field_suffix: '.exact',
          boost: 2,
        },
      });
    });
  });
});
