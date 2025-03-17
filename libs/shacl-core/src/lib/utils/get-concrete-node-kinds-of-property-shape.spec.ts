import { ExpandedJsonLdContainer, JsonLdNode } from '@cognizone/json-ld-core';
import { HANAMI, SH } from '@cognizone/lod-core';
import { ShPropertyShape } from '../models';
import { getConcreteNodeKindsOfPropertyShape } from './get-concrete-node-kinds-of-property-shape';

describe('getConcreteNodeKindsOfPropertyShape', () => {
  let shapesGraph: ExpandedJsonLdContainer;

  beforeEach(() => {
    shapesGraph = { nodes: {} };
  });

  it('should return empty array for null/undefined property shape', () => {
    expect(getConcreteNodeKindsOfPropertyShape(null, shapesGraph)).toEqual([]);
    expect(getConcreteNodeKindsOfPropertyShape(undefined, shapesGraph)).toEqual([]);
  });

  it('should return concrete node kinds based on nodeKind property', () => {
    const propertyShape: ShPropertyShape = {
      '@id': 'test:shape1',
      '@type': [SH.PropertyShape],
      [SH.nodeKind]: [{ '@value': SH.IRI }],
    };

    const result = getConcreteNodeKindsOfPropertyShape(propertyShape, shapesGraph);
    expect(result).toEqual([SH.IRI]);
  });

  it('should include IRI and BlankNode when class is specified', () => {
    const propertyShape: ShPropertyShape = {
      '@id': 'test:shape2',
      '@type': [SH.PropertyShape],
      [SH.class]: [{ '@id': 'test:SomeClass' }],
    };

    const result = getConcreteNodeKindsOfPropertyShape(propertyShape, shapesGraph);
    expect(result).toContain(SH.IRI);
    expect(result).toContain(SH.BlankNode);
    expect(result.length).toBe(2);
  });

  it('should include IRI when selection is specified', () => {
    const propertyShape: ShPropertyShape = {
      '@id': 'test:shape3',
      '@type': [SH.PropertyShape],
      [HANAMI.selection]: [{ '@value': 'some-selection' }],
    };

    const result = getConcreteNodeKindsOfPropertyShape(propertyShape, shapesGraph);
    expect(result).toEqual([SH.IRI]);
  });

  it('should include Literal when datatype is specified', () => {
    const propertyShape: ShPropertyShape = {
      '@id': 'test:shape4',
      '@type': [SH.PropertyShape],
      [SH.datatype]: [{ '@id': 'xsd:string' }],
    };

    const result = getConcreteNodeKindsOfPropertyShape(propertyShape, shapesGraph);
    expect(result).toEqual([SH.Literal]);
  });

  it('should handle or conditions', () => {
    const propertyShape: ShPropertyShape = {
      '@id': 'test:shape5',
      '@type': [SH.PropertyShape],
      [SH.or]: [{ '@id': 'test:subShape1' }, { '@id': 'test:subShape2' }],
    };

    const subShape1: JsonLdNode = {
      '@id': 'test:subShape1',
      '@type': [SH.PropertyShape],
      [SH.datatype]: [{ '@id': 'xsd:string' }],
    } as JsonLdNode;

    const subShape2: JsonLdNode = {
      '@id': 'test:subShape2',
      '@type': [SH.PropertyShape],
      [SH.class]: [{ '@id': 'test:SomeClass' }],
    } as JsonLdNode;

    shapesGraph = {
      nodes: {
        'test:subShape1': subShape1,
        'test:subShape2': subShape2,
      },
    };

    const result = getConcreteNodeKindsOfPropertyShape(propertyShape, shapesGraph);
    expect(result).toContain(SH.Literal);
    expect(result).toContain(SH.IRI);
    expect(result).toContain(SH.BlankNode);
  });

  it('should return all node kinds when no constraints are specified', () => {
    const propertyShape: ShPropertyShape = {
      '@id': 'test:shape6',
      '@type': [SH.PropertyShape],
    };

    const result = getConcreteNodeKindsOfPropertyShape(propertyShape, shapesGraph);
    expect(result).toContain(SH.BlankNode);
    expect(result).toContain(SH.IRI);
    expect(result).toContain(SH.Literal);
    expect(result.length).toBe(3);
  });
});
