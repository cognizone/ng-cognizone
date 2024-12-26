import { rangeQuery } from './range-query';

describe('RangeQuery', () => {
  describe('rangeQuery', () => {
    it('should create a range query with basic options', () => {
      const result = rangeQuery('field', {
        gte: '2023-01-01',
        lt: '2024-01-01',
      });
      expect(result).toEqual({
        range: {
          field: {
            gte: '2023-01-01',
            lt: '2024-01-01',
          },
        },
      });
    });

    it('should create a range query with all options', () => {
      const result = rangeQuery('field', {
        gte: '2023-01-01',
        lt: '2024-01-01',
        format: 'yyyy-MM-dd',
        relation: 'INTERSECTS',
        time_zone: '+01:00',
        boost: 2,
        _name: 'test',
      });
      expect(result).toEqual({
        _name: 'test',
        range: {
          field: {
            gte: '2023-01-01',
            lt: '2024-01-01',
            format: 'yyyy-MM-dd',
            relation: 'INTERSECTS',
            time_zone: '+01:00',
            boost: 2,
          },
        },
      });
    });
  });
});
