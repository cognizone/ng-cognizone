import { BoolQueryBuilder } from './bool-query-builder';
import { TermQuery } from './term-query';

describe('BoolQueryBuilder', () => {
  let builder: BoolQueryBuilder;
  let termQuery: TermQuery;
  let termQuery2: TermQuery;
  let termQuery3: TermQuery;
  let termQuery4: TermQuery;

  beforeEach(() => {
    builder = new BoolQueryBuilder();
    termQuery = {
      term: {
        field: { value: 'test' },
      },
    };
    termQuery2 = {
      term: {
        field2: { value: 'test2' },
      },
    };
    termQuery3 = {
      term: {
        field3: { value: 'test3' },
      },
    };
    termQuery4 = {
      term: {
        field4: { value: 'test4' },
      },
    };
  });

  it('should build an empty bool query', () => {
    const result = builder.build();
    expect(result).toEqual({ bool: {} });
  });

  describe('must', () => {
    it('should add must query', () => {
      const result = builder.must(termQuery).build();
      expect(result).toEqual({
        bool: {
          must: termQuery,
        },
      });
    });

    it('should append must query by default', () => {
      const result = builder.must(termQuery).must(termQuery2).build();
      expect(result.bool.must).toHaveLength(2);
    });

    it('should override must query with option', () => {
      const result = builder.must(termQuery).must(termQuery2, { override: true }).build();
      expect(result.bool.must).toEqual(termQuery2);
    });
  });

  describe('mustNot', () => {
    it('should add must_not query', () => {
      const result = builder.mustNot(termQuery).build();
      expect(result).toEqual({
        bool: {
          must_not: termQuery,
        },
      });
    });
  });

  describe('filter', () => {
    it('should add filter query', () => {
      const result = builder.filter(termQuery).build();
      expect(result).toEqual({
        bool: {
          filter: termQuery,
        },
      });
    });
  });

  describe('should', () => {
    it('should add should query', () => {
      const result = builder.should(termQuery).build();
      expect(result).toEqual({
        bool: {
          should: termQuery,
        },
      });
    });
  });

  describe('minimumShouldMatch', () => {
    it('should set minimum_should_match', () => {
      const result = builder.minimumShouldMatch(2).build();
      expect(result).toEqual({
        bool: {
          minimum_should_match: 2,
        },
      });
    });

    it('should allow undefined minimum_should_match', () => {
      const result = builder.minimumShouldMatch(2).minimumShouldMatch(undefined).build();
      expect(result).toEqual({
        bool: {
          minimum_should_match: undefined,
        },
      });
    });
  });

  describe('chaining', () => {
    it('should support method chaining with all query types', () => {
      const result = builder.must(termQuery).mustNot(termQuery2).filter(termQuery3).should(termQuery4).minimumShouldMatch(2).build();

      expect(result).toEqual({
        bool: {
          must: termQuery,
          must_not: termQuery2,
          filter: termQuery3,
          should: termQuery4,
          minimum_should_match: 2,
        },
      });
    });
  });
});
