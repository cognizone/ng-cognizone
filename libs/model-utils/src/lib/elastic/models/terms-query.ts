import { ElasticQuery } from './elastic-query';

export interface TermsQuery extends ElasticQuery {
  terms: {
    // only string[] really, but typescript screams otherwise
    [field: string]: string[] | number | boolean | undefined;
    boost?: number;
    case_insensitive?: boolean;
  };
}

export interface TermsQueryInner {
  boost?: number;
  case_insensitive?: boolean;
}

export function termsQuery(field: string, value: string[], options?: TermsQueryInner & { _name?: string }): TermsQuery {
  const { _name, ...otherOptions } = options ?? {};
  return {
    _name,
    terms: {
      [field]: value,
      ...otherOptions,
    },
  };
}
