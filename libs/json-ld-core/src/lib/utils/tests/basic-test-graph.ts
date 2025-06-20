import { ExpandedJsonLdContainer } from '../../models/json-ld-container';

export const basicTestGraph: ExpandedJsonLdContainer = {
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
