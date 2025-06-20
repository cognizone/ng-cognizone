import { ExpandedJsonLdContainer } from '../../models/json-ld-container';

export const wideTestGraph: ExpandedJsonLdContainer = {
  nodes: {
    'test:university': {
      '@id': 'test:university',
      '@type': ['test:University'],
      'test:name': [{ '@value': 'Test University' }],
      'test:departments': [{ '@id': 'test:dept1' }, { '@id': 'test:dept2' }, { '@id': 'test:dept3' }],
      'test:facilities': [{ '@id': 'test:library' }, { '@id': 'test:lab' }, { '@id': 'test:gym' }],
    },
    'test:dept1': {
      '@id': 'test:dept1',
      '@type': ['test:Department'],
      'test:name': [{ '@value': 'Computer Science' }],
      'test:students': [{ '@id': 'test:student1' }, { '@id': 'test:student2' }, { '@id': 'test:student3' }],
      'test:professors': [{ '@id': 'test:prof1' }, { '@id': 'test:prof2' }],
    },
    'test:dept2': {
      '@id': 'test:dept2',
      '@type': ['test:Department'],
      'test:name': [{ '@value': 'Mathematics' }],
      'test:students': [{ '@id': 'test:student4' }, { '@id': 'test:student5' }],
      'test:professors': [{ '@id': 'test:prof3' }],
    },
    'test:dept3': {
      '@id': 'test:dept3',
      '@type': ['test:Department'],
      'test:name': [{ '@value': 'Physics' }],
      'test:students': [{ '@id': 'test:student6' }],
      'test:professors': [{ '@id': 'test:prof4' }, { '@id': 'test:prof5' }],
    },
    'test:student1': {
      '@id': 'test:student1',
      '@type': ['test:Student'],
      'test:name': [{ '@value': 'Alice Johnson' }],
      'test:age': [{ '@value': 20 }],
      'test:courses': [{ '@id': 'test:course1' }, { '@id': 'test:course2' }],
    },
    'test:student2': {
      '@id': 'test:student2',
      '@type': ['test:Student'],
      'test:name': [{ '@value': 'Bob Smith' }],
      'test:age': [{ '@value': 22 }],
      'test:courses': [{ '@id': 'test:course1' }],
    },
    'test:prof1': {
      '@id': 'test:prof1',
      '@type': ['test:Professor'],
      'test:name': [{ '@value': 'Dr. Smith' }],
      'test:specialization': [{ '@value': 'AI' }],
      'test:researchAreas': [{ '@value': 'Machine Learning' }, { '@value': 'Neural Networks' }],
    },
    'test:course1': {
      '@id': 'test:course1',
      '@type': ['test:Course'],
      'test:name': [{ '@value': 'Introduction to Programming' }],
      'test:credits': [{ '@value': 3 }],
      'test:prerequisites': [{ '@id': 'test:course0' }],
    },
    'test:course2': {
      '@id': 'test:course2',
      '@type': ['test:Course'],
      'test:name': [{ '@value': 'Data Structures' }],
      'test:credits': [{ '@value': 4 }],
      'test:prerequisites': [{ '@id': 'test:course1' }],
    },
    'test:course0': {
      '@id': 'test:course0',
      '@type': ['test:Course'],
      'test:name': [{ '@value': 'Basic Mathematics' }],
      'test:credits': [{ '@value': 2 }],
    },
  },
} as unknown as ExpandedJsonLdContainer;
