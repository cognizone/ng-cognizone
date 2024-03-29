/* eslint-disable id-blacklist */
import { createDynamicNamespace, createNamespace } from './namespace';

describe('Namespace', () => {
  it(`should create an xsd namespace`, () => {
    const xsd = createNamespace('http://www.w3.org/2001/XMLSchema#', [
      'boolean',
      'date',
      'dateTime',
      'decimal',
      'double',
      'float',
      'integer',
      'long',
      'short',
      'string',
    ]);

    expect(xsd).toEqual({
      boolean: 'http://www.w3.org/2001/XMLSchema#boolean',
      date: 'http://www.w3.org/2001/XMLSchema#date',
      dateTime: 'http://www.w3.org/2001/XMLSchema#dateTime',
      decimal: 'http://www.w3.org/2001/XMLSchema#decimal',
      double: 'http://www.w3.org/2001/XMLSchema#double',
      float: 'http://www.w3.org/2001/XMLSchema#float',
      integer: 'http://www.w3.org/2001/XMLSchema#integer',
      long: 'http://www.w3.org/2001/XMLSchema#long',
      short: 'http://www.w3.org/2001/XMLSchema#short',
      string: 'http://www.w3.org/2001/XMLSchema#string',
    });
  });

  it(`should create a dynamic xsd namespace`, () => {
    const xsd = createDynamicNamespace<
      'boolean' | 'date' | 'dateTime' | 'decimal' | 'double' | 'float' | 'integer' | 'long' | 'short' | 'string',
      'http://www.w3.org/2001/XMLSchema#'
    >('http://www.w3.org/2001/XMLSchema#');

    expect(xsd).toEqual({});
    expect(xsd.boolean).toEqual('http://www.w3.org/2001/XMLSchema#boolean');
    expect(xsd).toEqual({});
  });
});
