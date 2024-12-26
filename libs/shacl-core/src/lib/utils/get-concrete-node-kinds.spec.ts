import { SH } from '@cognizone/lod-core';
import { getConcreteNodeKinds } from './get-concrete-node-kinds';

describe('getConcreteNodeKinds', () => {
  it('should return [BlankNode, IRI] for BlankNodeOrIRI', () => {
    const result = getConcreteNodeKinds(SH.BlankNodeOrIRI);
    expect(result).toEqual([SH.BlankNode, SH.IRI]);
  });

  it('should return [BlankNode, Literal] for BlankNodeOrLiteral', () => {
    const result = getConcreteNodeKinds(SH.BlankNodeOrLiteral);
    expect(result).toEqual([SH.BlankNode, SH.Literal]);
  });

  it('should return [IRI, Literal] for IRIOrLiteral', () => {
    const result = getConcreteNodeKinds(SH.IRIOrLiteral);
    expect(result).toEqual([SH.IRI, SH.Literal]);
  });

  it('should return the same value for concrete node kinds', () => {
    const concreteKinds = [SH.BlankNode, SH.IRI, SH.Literal];

    concreteKinds.forEach(kind => {
      const result = getConcreteNodeKinds(kind);
      expect(result).toEqual([kind]);
    });
  });
});
