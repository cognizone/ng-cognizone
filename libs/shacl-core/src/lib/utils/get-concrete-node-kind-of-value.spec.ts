import { JsonLdValue } from '@cognizone/json-ld-core';
import { SH } from '@cognizone/lod-core';

import { getConcreteNodeKindOfValue } from './get-concrete-node-kind-of-value';

describe('getConcreteNodeKindOfValue', () => {
  it('should return SH.Literal for literal values', () => {
    const literalValue: JsonLdValue = {
      '@value': 'test string',
      '@type': 'xsd:string',
    };

    const result = getConcreteNodeKindOfValue(literalValue);
    expect(result).toBe(SH.Literal);
  });

  it('should return SH.IRI for IRI references', () => {
    const iriValue: JsonLdValue = {
      '@id': 'http://example.com/resource',
    };

    const result = getConcreteNodeKindOfValue(iriValue);
    expect(result).toBe(SH.IRI);
  });

  it('should return SH.BlankNode for blank node references', () => {
    const blankNodeValue: JsonLdValue = {
      '@id': '_:b0',
    };

    const result = getConcreteNodeKindOfValue(blankNodeValue);
    expect(result).toBe(SH.BlankNode);
  });

  it('should throw error for invalid value', () => {
    const invalidValue = {} as JsonLdValue;

    expect(() => getConcreteNodeKindOfValue(invalidValue)).toThrow('Cannot get concrete node kind of [object Object]');
  });

  it('should handle numeric literal values', () => {
    const numericValue: JsonLdValue = {
      '@value': '42',
      '@type': 'xsd:integer',
    };

    const result = getConcreteNodeKindOfValue(numericValue);
    expect(result).toBe(SH.Literal);
  });

  it('should handle boolean literal values', () => {
    const booleanValue: JsonLdValue = {
      '@value': 'true',
      '@type': 'xsd:boolean',
    };

    const result = getConcreteNodeKindOfValue(booleanValue);
    expect(result).toBe(SH.Literal);
  });
});
