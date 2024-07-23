/* eslint-disable */
export default {
  displayName: 'ng-application-profile',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {},
  transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
  coverageDirectory: '../../coverage/libs/ng-application-profile',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  transform: {
    '^.+.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        stringifyContentPathRegex: '\\.(html|svg)$',
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
  },
};
