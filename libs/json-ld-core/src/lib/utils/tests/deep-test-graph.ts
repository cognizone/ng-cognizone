import { ExpandedJsonLdContainer } from '../../models/json-ld-container';

export const deepTestGraph: ExpandedJsonLdContainer = {
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
