import { DataError } from '../models/data-error';

export class SetErrors {
  static readonly type: string = '[DataValidation] set errors';

  constructor(public errors: DataError[]) {}
}

export class AddErrors {
  static readonly type: string = '[DataValidation] add errors';

  constructor(public errors: DataError[]) {}
}

export class SetElasticQuery {
  static readonly type: string = '[DataValidation] set elastic query';

  constructor(public elasticQuery: {}) {}
}
