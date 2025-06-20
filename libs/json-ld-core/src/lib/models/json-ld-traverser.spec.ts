import { JsonLdNodeTraverser, JsonLdTraverser } from './json-ld-traverser';
import { ExpandedJsonLdContainer } from './json-ld-container';
import * as qualificationGraph from './tests/qualification-graph.json';

describe('JsonLdTraverser', () => {
  let traverser: JsonLdTraverser;
  let testGraph: ExpandedJsonLdContainer;

  beforeEach(() => {
    testGraph = {
      nodes: {
        'test:root': {
          '@id': 'test:root',
          '@type': ['test:RootType'],
          'test:singleReference': [
            {
              '@id': 'test:child1',
            },
          ],
          'test:multipleReferences': [
            {
              '@id': 'test:child1',
            },
            {
              '@id': 'test:child2',
            },
          ],
          'test:singleLiteral': [
            {
              '@value': 'test value',
            },
          ],
          'test:multipleLiterals': [
            {
              '@value': 'value1',
            },
            {
              '@value': 'value2',
            },
          ],
          'test:mixedValues': [
            {
              '@id': 'test:child1',
            },
            {
              '@value': 'literal value',
            },
          ],
          'test:emptyArray': [],
          'test:nonExistentProperty': undefined,
        },
        'test:child1': {
          '@id': 'test:child1',
          '@type': ['test:ChildType'],
          'test:childProperty': [
            {
              '@value': 'child value',
            },
          ],
        },
        'test:child2': {
          '@id': 'test:child2',
          '@type': ['test:ChildType'],
          'test:childProperty': [
            {
              '@value': 'child value 2',
            },
          ],
        },
        'test:nonExistentNode': undefined,
      },
    } as unknown as ExpandedJsonLdContainer;

    traverser = new JsonLdTraverser({ jsonLd: testGraph });
  });

  describe('getNodeTraverser', () => {
    it('should create a node traverser for existing node', () => {
      const nodeTraverser = traverser.getNodeTraverser('test:root');
      expect(nodeTraverser).toBeDefined();
      expect(nodeTraverser.uri).toBe('test:root');
    });

    it('should create a node traverser for non-existent node', () => {
      const nodeTraverser = traverser.getNodeTraverser('test:nonExistent');
      expect(nodeTraverser).toBeDefined();
      expect(nodeTraverser.uri).toBe('test:nonExistent');
    });
  });

  describe('JsonLdNodeTraverser', () => {
    let rootTraverser: JsonLdNodeTraverser;

    beforeEach(() => {
      rootTraverser = traverser.getNodeTraverser('test:root');
    });

    describe('getNodes', () => {
      it('should return single node for single reference', () => {
        const nodes = rootTraverser.getNodes('test:singleReference');
        expect(nodes).toHaveLength(1);
        expect(nodes[0].uri).toBe('test:child1');
      });

      it('should return multiple nodes for multiple references', () => {
        const nodes = rootTraverser.getNodes('test:multipleReferences');
        expect(nodes).toHaveLength(2);
        expect(nodes[0].uri).toBe('test:child1');
        expect(nodes[1].uri).toBe('test:child2');
      });

      it('should return empty array for non-existent property', () => {
        const nodes = rootTraverser.getNodes('test:nonExistentProperty');
        expect(nodes).toHaveLength(0);
      });

      it('should return empty array for empty array property', () => {
        const nodes = rootTraverser.getNodes('test:emptyArray');
        expect(nodes).toHaveLength(0);
      });

      it('should filter out non-reference values', () => {
        const nodes = rootTraverser.getNodes('test:mixedValues');
        expect(nodes).toHaveLength(1);
        expect(nodes[0].uri).toBe('test:child1');
      });

      it('should handle non-existent node gracefully', () => {
        const nonExistentTraverser = traverser.getNodeTraverser('test:nonExistentNode');
        const nodes = nonExistentTraverser.getNodes('test:anyProperty');
        expect(nodes).toHaveLength(0);
      });
    });

    describe('getNode', () => {
      it('should return first node for single reference', () => {
        const node = rootTraverser.getNode('test:singleReference');
        expect(node).toBeDefined();
        expect(node?.uri).toBe('test:child1');
      });

      it('should return first node for multiple references', () => {
        const node = rootTraverser.getNode('test:multipleReferences');
        expect(node).toBeDefined();
        expect(node?.uri).toBe('test:child1');
      });

      it('should return undefined for non-existent property', () => {
        const node = rootTraverser.getNode('test:nonExistentProperty');
        expect(node).toBeUndefined();
      });

      it('should return undefined for empty array property', () => {
        const node = rootTraverser.getNode('test:emptyArray');
        expect(node).toBeUndefined();
      });
    });

    describe('getAttributes', () => {
      it('should return single literal value', () => {
        const attributes = rootTraverser.getAttributes<string>('test:singleLiteral');
        expect(attributes).toHaveLength(1);
        expect(attributes[0]).toBe('test value');
      });

      it('should return multiple literal values', () => {
        const attributes = rootTraverser.getAttributes<string>('test:multipleLiterals');
        expect(attributes).toHaveLength(2);
        expect(attributes[0]).toBe('value1');
        expect(attributes[1]).toBe('value2');
      });

      it('should return empty array for non-existent property', () => {
        const attributes = rootTraverser.getAttributes<string>('test:nonExistentProperty');
        expect(attributes).toHaveLength(0);
      });

      it('should return empty array for empty array property', () => {
        const attributes = rootTraverser.getAttributes<string>('test:emptyArray');
        expect(attributes).toHaveLength(0);
      });

      it('should filter out reference values', () => {
        const attributes = rootTraverser.getAttributes<string>('test:mixedValues');
        expect(attributes).toHaveLength(2);
        expect(attributes).toContain('literal value');
        expect(attributes).toContain('test:child1');
      });

      it('should handle non-existent node gracefully', () => {
        const nonExistentTraverser = traverser.getNodeTraverser('test:nonExistentNode');
        const attributes = nonExistentTraverser.getAttributes<string>('test:anyProperty');
        expect(attributes).toHaveLength(0);
      });

      it('should work with different primitive types', () => {
        const numberTraverser = traverser.getNodeTraverser('test:child1');
        const attributes = numberTraverser.getAttributes<string>('test:childProperty');
        expect(attributes).toHaveLength(1);
        expect(attributes[0]).toBe('child value');
      });
    });

    describe('unwrap', () => {
      it('should return the actual node for existing node', () => {
        const node = rootTraverser.unwrap();
        expect(node).toBeDefined();
        expect(node['@id']).toBe('test:root');
        expect(node['@type']).toEqual(['test:RootType']);
      });

      it('should return undefined for non-existent node', () => {
        const nonExistentTraverser = traverser.getNodeTraverser('test:nonExistentNode');
        const node = nonExistentTraverser.unwrap();
        expect(node).toBeUndefined();
      });
    });

    describe('chaining', () => {
      it('should allow chaining traverser calls', () => {
        const childTraverser = rootTraverser.getNode('test:singleReference');
        expect(childTraverser).toBeDefined();

        const childAttributes = childTraverser?.getAttributes<string>('test:childProperty');
        expect(childAttributes).toHaveLength(1);
        expect(childAttributes?.[0]).toBe('child value');
      });

      it('should handle chaining with non-existent nodes', () => {
        const nonExistentTraverser = traverser.getNodeTraverser('test:nonExistentNode');
        const childTraverser = nonExistentTraverser.getNode('test:anyProperty');
        expect(childTraverser).toBeUndefined();
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty graph', () => {
      const emptyTraverser = new JsonLdTraverser({ jsonLd: { nodes: {} } });
      const nodeTraverser = emptyTraverser.getNodeTraverser('any:uri');

      expect(nodeTraverser.getNodes('any:property')).toHaveLength(0);
      expect(nodeTraverser.getNode('any:property')).toBeUndefined();
      expect(nodeTraverser.getAttributes('any:property')).toHaveLength(0);
      expect(nodeTraverser.unwrap()).toBeUndefined();
    });
  });

  describe('complex scenarios', () => {
    it('should handle nested traversal', () => {
      const child1Traverser = traverser.getNodeTraverser('test:root').getNode('test:singleReference');
      expect(child1Traverser).toBeDefined();

      const childValue = child1Traverser?.getAttributes<string>('test:childProperty');
      expect(childValue).toHaveLength(1);
      expect(childValue?.[0]).toBe('child value');
    });

    it('should handle multiple levels of traversal', () => {
      // Create a more complex graph for testing
      const complexGraph = {
        nodes: {
          'test:level1': {
            '@id': 'test:level1',
            'test:level2Ref': [{ '@id': 'test:level2' }],
          },
          'test:level2': {
            '@id': 'test:level2',
            'test:level3Ref': [{ '@id': 'test:level3' }],
          },
          'test:level3': {
            '@id': 'test:level3',
            'test:finalValue': [{ '@value': 'final result' }],
          },
        },
      } as unknown as ExpandedJsonLdContainer;

      const complexTraverser = new JsonLdTraverser({ jsonLd: complexGraph });
      const level1Traverser = complexTraverser.getNodeTraverser('test:level1');
      const level2Traverser = level1Traverser.getNode('test:level2Ref');
      const level3Traverser = level2Traverser?.getNode('test:level3Ref');
      const finalValue = level3Traverser?.getAttributes<string>('test:finalValue');

      expect(finalValue).toHaveLength(1);
      expect(finalValue?.[0]).toBe('final result');
    });
  });

  describe('qualification graph scenarios', () => {
    let qualificationTraverser: JsonLdTraverser;
    let rootQualificationTraverser: JsonLdNodeTraverser;

    beforeEach(() => {
      qualificationTraverser = new JsonLdTraverser({
        jsonLd: qualificationGraph as unknown as ExpandedJsonLdContainer,
      });
      rootQualificationTraverser = qualificationTraverser.getNodeTraverser(
        'https://data.acqf-qcp.africa/resource/3c9c2982-8457-4aad-91e5-cd095573db1b/version/2025-06-20T12:51:23.3599399'
      );
    });

    describe('qualification root node traversal', () => {
      it('should access qualification title', () => {
        const title = rootQualificationTraverser.getAttributes<string>('http://purl.org/dc/terms/title');
        expect(title).toHaveLength(1);
        expect(title[0]).toBe('Postgraduate Diploma in Labour Dispute Resolution');
      });

      it('should access qualification type', () => {
        const node = rootQualificationTraverser.unwrap();
        expect(node?.['@type']).toEqual(['http://data.europa.eu/snb/model/elm/Qualification']);
      });

      it('should access education level', () => {
        const educationLevel = rootQualificationTraverser.getAttributes<string>('http://data.europa.eu/snb/model/elm/educationLevel');
        expect(educationLevel).toHaveLength(1);
        expect(educationLevel[0]).toBe('https://data.acqf-qcp.africa/model/acqf-levels/resource/level6');
      });

      it('should access modified date', () => {
        const modified = rootQualificationTraverser.getAttributes<string>('http://purl.org/dc/terms/modified');
        expect(modified).toHaveLength(1);
        expect(modified[0]).toBe('2025-06-20T12:51:23.3599399');
      });

      it('should access publication status', () => {
        const status = rootQualificationTraverser.getAttributes<string>(
          'https://data.acqf-qcp.africa/model/elm-extension/hasPublicationStatus'
        );
        expect(status).toHaveLength(1);
        expect(status[0]).toBe('https://data.acqf-qcp.africa/model/internal/publication-statuses/resource/released');
      });
    });

    describe('accreditation traversal', () => {
      it('should access accreditation node', () => {
        const accreditation = rootQualificationTraverser.getNode('http://data.europa.eu/snb/model/elm/accreditation');
        expect(accreditation).toBeDefined();
        expect(accreditation?.uri).toBe('_:b0');
      });

      it('should access accreditation title', () => {
        const accreditation = rootQualificationTraverser.getNode('http://data.europa.eu/snb/model/elm/accreditation');
        const title = accreditation?.getAttributes<string>('http://purl.org/dc/terms/title');
        expect(title).toHaveLength(1);
        expect(title?.[0]).toBe('Accreditation Title');
      });

      it('should access accrediting agent', () => {
        const accreditation = rootQualificationTraverser.getNode('http://data.europa.eu/snb/model/elm/accreditation');
        const agent = accreditation?.getNode('http://data.europa.eu/snb/model/elm/accreditingAgent');
        expect(agent).toBeDefined();
        expect(agent?.uri).toBe('_:b1');
      });

      it('should access accrediting agent name', () => {
        const accreditation = rootQualificationTraverser.getNode('http://data.europa.eu/snb/model/elm/accreditation');
        const agent = accreditation?.getNode('http://data.europa.eu/snb/model/elm/accreditingAgent');
        const name = agent?.getAttributes<string>('http://www.w3.org/2004/02/skos/core#prefLabel');
        expect(name).toHaveLength(1);
        expect(name?.[0]).toBe('Accrediting Agent 1');
      });

      it('should access accreditation expiry date', () => {
        const accreditation = rootQualificationTraverser.getNode('http://data.europa.eu/snb/model/elm/accreditation');
        const expiryDate = accreditation?.getAttributes<string>('http://data.europa.eu/snb/model/elm/expiryDate');
        expect(expiryDate).toHaveLength(1);
        expect(expiryDate?.[0]).toBe('2025-12-31T00:00:00Z');
      });
    });

    describe('awarding opportunity traversal', () => {
      it('should access awarding opportunity', () => {
        const awardingOpportunity = rootQualificationTraverser.getNode('http://data.europa.eu/snb/model/elm/awardingOpportunity');
        expect(awardingOpportunity).toBeDefined();
        expect(awardingOpportunity?.uri).toBe('_:b6');
      });

      it('should access multiple awarding bodies', () => {
        const awardingOpportunity = rootQualificationTraverser.getNode('http://data.europa.eu/snb/model/elm/awardingOpportunity');
        const bodies = awardingOpportunity?.getNodes('http://data.europa.eu/snb/model/elm/awardingBody');
        expect(bodies).toHaveLength(2);
        expect(bodies?.[0].uri).toBe('_:b8');
        expect(bodies?.[1].uri).toBe('_:b10');
      });

      it('should access awarding body names', () => {
        const awardingOpportunity = rootQualificationTraverser.getNode('http://data.europa.eu/snb/model/elm/awardingOpportunity');
        const bodies = awardingOpportunity?.getNodes('http://data.europa.eu/snb/model/elm/awardingBody');

        const body1Name = bodies?.[0].getAttributes<string>('http://www.w3.org/2004/02/skos/core#prefLabel');
        const body2Name = bodies?.[1].getAttributes<string>('http://www.w3.org/2004/02/skos/core#prefLabel');

        expect(body1Name).toHaveLength(1);
        expect(body1Name?.[0]).toBe('Awarding Body 1');
        expect(body2Name).toHaveLength(1);
        expect(body2Name?.[0]).toBe('Awarding Body 2');
      });

      it('should access awarding opportunity identifier', () => {
        const awardingOpportunity = rootQualificationTraverser.getNode('http://data.europa.eu/snb/model/elm/awardingOpportunity');
        const identifier = awardingOpportunity?.getNode('http://www.w3.org/ns/adms#identifier');
        const notation = identifier?.getAttributes<string>('http://www.w3.org/2004/02/skos/core#notation');
        expect(notation).toHaveLength(1);
        expect(notation?.[0]).toBe('AO12345');
      });
    });

    describe('credit point traversal', () => {
      it('should access credit point', () => {
        const creditPoint = rootQualificationTraverser.getNode('http://data.europa.eu/snb/model/elm/creditPoint');
        expect(creditPoint).toBeDefined();
        expect(creditPoint?.uri).toBe('_:b13');
      });

      it('should access credit point value', () => {
        const creditPoint = rootQualificationTraverser.getNode('http://data.europa.eu/snb/model/elm/creditPoint');
        const point = creditPoint?.getAttributes<string>('http://data.europa.eu/snb/model/elm/point');
        expect(point).toHaveLength(1);
        expect(point?.[0]).toBe('30');
      });

      it('should access credit point framework', () => {
        const creditPoint = rootQualificationTraverser.getNode('http://data.europa.eu/snb/model/elm/creditPoint');
        const framework = creditPoint?.getAttributes<string>('http://data.europa.eu/snb/model/elm/framework');
        expect(framework).toHaveLength(1);
        expect(framework?.[0]).toBe('https://data.acqf-qcp.africa/model/creditpoint-framework/resource/framework123');
      });
    });

    describe('learning outcome traversal', () => {
      it('should access learning outcome', () => {
        const learningOutcome = rootQualificationTraverser.getNode('http://data.europa.eu/snb/model/elm/learningOutcome');
        expect(learningOutcome).toBeDefined();
        expect(learningOutcome?.uri).toBe('_:b16');
      });

      it('should access learning outcome title', () => {
        const learningOutcome = rootQualificationTraverser.getNode('http://data.europa.eu/snb/model/elm/learningOutcome');
        const title = learningOutcome?.getAttributes<string>('http://purl.org/dc/terms/title');
        expect(title).toHaveLength(1);
        expect(title?.[0]).toBe('Postgraduate Diploma in Labour Dispute Resolution');
      });

      it('should access learning outcome note', () => {
        const learningOutcome = rootQualificationTraverser.getNode('http://data.europa.eu/snb/model/elm/learningOutcome');
        const note = learningOutcome?.getNode('http://data.europa.eu/snb/model/elm/additionalNote');
        const noteLiteral = note?.getAttributes<string>('http://data.europa.eu/snb/model/elm/noteLiteral');
        expect(noteLiteral).toHaveLength(1);
        expect(noteLiteral?.[0]).toBe('Learning outcome note.');
      });

      it('should access related skill', () => {
        const learningOutcome = rootQualificationTraverser.getNode('http://data.europa.eu/snb/model/elm/learningOutcome');
        const skill = learningOutcome?.getAttributes<string>('http://data.europa.eu/snb/model/elm/relatedSkill');
        expect(skill).toHaveLength(1);
        expect(skill?.[0]).toBe('http://data.europa.eu/esco/skill/skill123');
      });
    });

    describe('supplementary documents traversal', () => {
      it('should access multiple supplementary documents', () => {
        const documents = rootQualificationTraverser.getNodes('http://data.europa.eu/snb/model/elm/supplementaryDocument');
        expect(documents).toHaveLength(2);
        expect(documents?.[0].uri).toBe('_:b18');
        expect(documents?.[1].uri).toBe('_:b19');
      });

      it('should access document URLs', () => {
        const documents = rootQualificationTraverser.getNodes('http://data.europa.eu/snb/model/elm/supplementaryDocument');
        const url1 = documents?.[0].getAttributes<string>('http://data.europa.eu/snb/model/elm/contentUrl');
        const url2 = documents?.[1].getAttributes<string>('http://data.europa.eu/snb/model/elm/contentUrl');

        expect(url1).toHaveLength(1);
        expect(url1?.[0]).toBe('http://someurl.org');
        expect(url2).toHaveLength(1);
        expect(url2?.[0]).toBe('http://anotherurl.org');
      });
    });

    describe('complex nested traversal', () => {
      it('should traverse from qualification to accrediting agent location', () => {
        const accreditation = rootQualificationTraverser.getNode('http://data.europa.eu/snb/model/elm/accreditation');
        const agent = accreditation?.getNode('http://data.europa.eu/snb/model/elm/accreditingAgent');
        const location = agent?.getNode('http://data.europa.eu/snb/model/elm/location');
        const spatialCode = location?.getAttributes<string>('http://data.europa.eu/snb/model/elm/spatialCode');

        expect(spatialCode).toHaveLength(1);
        expect(spatialCode?.[0]).toBe('http://publications.europa.eu/resource/authority/country/ZAF');
      });

      it('should traverse from qualification to awarding body location', () => {
        const awardingOpportunity = rootQualificationTraverser.getNode('http://data.europa.eu/snb/model/elm/awardingOpportunity');
        const body = awardingOpportunity?.getNode('http://data.europa.eu/snb/model/elm/awardingBody');
        const location = body?.getNode('http://data.europa.eu/snb/model/elm/location');
        const spatialCode = location?.getAttributes<string>('http://data.europa.eu/snb/model/elm/spatialCode');

        expect(spatialCode).toHaveLength(1);
        expect(spatialCode?.[0]).toBe('http://publications.europa.eu/resource/authority/country/ZAR');
      });

      it('should traverse from qualification to learning opportunity', () => {
        const learningOpportunity = rootQualificationTraverser.getNode(
          'https://data.acqf-qcp.africa/model/elm-extension/learningOpportunity'
        );
        const title = learningOpportunity?.getAttributes<string>('http://purl.org/dc/terms/title');
        const providedBy = learningOpportunity?.getNode('http://data.europa.eu/snb/model/elm/providedBy');
        const providerName = providedBy?.getAttributes<string>('http://www.w3.org/2004/02/skos/core#prefLabel');

        expect(title).toHaveLength(1);
        expect(title?.[0]).toBe('Some learning opportunity');
        expect(providerName).toHaveLength(1);
        expect(providerName?.[0]).toBe('Some agent 3');
      });
    });

    describe('edge cases with qualification graph', () => {
      it('should handle non-existent properties gracefully', () => {
        const nonExistent = rootQualificationTraverser.getAttributes<string>('http://non-existent/property');
        expect(nonExistent).toHaveLength(0);
      });

      it('should handle non-existent nodes gracefully', () => {
        const nonExistentNode = qualificationTraverser.getNodeTraverser('http://non-existent/node');
        const result = nonExistentNode.getAttributes<string>('http://any/property');
        expect(result).toHaveLength(0);
      });

      it('should handle mixed literal and reference values', () => {
        const country = rootQualificationTraverser.getAttributes<string>('https://data.acqf-qcp.africa/model/elm-extension/hasCountry');
        expect(country).toHaveLength(1);
        expect(country?.[0]).toBe('http://publications.europa.eu/resource/authority/country/GLP');
      });
    });

    describe('multiple predicates', () => {
      it('should access multiple predicates', () => {
        const titleThroughDeepPath = rootQualificationTraverser.getAttribute<string>([
          'http://data.europa.eu/snb/model/elm/accreditation',
          'http://data.europa.eu/snb/model/elm/organisation',
          'http://www.w3.org/2004/02/skos/core#prefLabel',
        ]);
        expect(titleThroughDeepPath).toBe('Accredited Organisation 1');

        const titleThroughMultipleCalls = rootQualificationTraverser
          .getNode('http://data.europa.eu/snb/model/elm/accreditation')
          ?.getNode('http://data.europa.eu/snb/model/elm/organisation')
          ?.getAttribute('http://www.w3.org/2004/02/skos/core#prefLabel');
        expect(titleThroughMultipleCalls).toBe(titleThroughDeepPath);
      });

      it('should access multiple predicates - raw values', () => {
        const titleThroughDeepPath = rootQualificationTraverser.getRawAttributes([
          'http://data.europa.eu/snb/model/elm/accreditation',
          'http://data.europa.eu/snb/model/elm/organisation',
          'http://www.w3.org/2004/02/skos/core#prefLabel',
        ]);
        expect(titleThroughDeepPath).toHaveLength(2);
        expect(titleThroughDeepPath[0]).toEqual({ '@value': 'Accredited Organisation 1', '@language': 'en' });
        expect(titleThroughDeepPath[1]).toEqual({ '@value': 'Organisation Accréditée 1', '@language': 'fr' });
      });
    });
  });
});
