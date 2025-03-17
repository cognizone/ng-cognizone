import { ElasticQuery } from './elastic-query';

export interface TermQuery extends ElasticQuery {
  term: {
    [field: string]: string | TermQueryInner;
  };
}

export interface TermQueryInner {
  value: string;
  boost?: number;
  case_insensitive?: boolean;
}

export function termQuery(field: string, value: string, options?: Omit<TermQueryInner, 'value'> & { _name?: string }): TermQuery {
  const { _name, ...otherOptions } = options ?? {};
  return {
    _name,
    term: {
      [field]: {
        value,
        ...otherOptions,
      },
    },
  };
}
