/* eslint-disable */
export default {
  displayName: 'model-utils',
  preset: '../../jest.preset.js',
  globals: {},
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/model-utils',
};
