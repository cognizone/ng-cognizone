const { getJestProjects } = require('@nrwl/jest');

export default {
  projects: [
    ...getJestProjects(),
    '<rootDir>/libs/ng-core',
    '<rootDir>/libs/model-utils',
    '<rootDir>/libs/application-profile',
    '<rootDir>/libs/devtools',
    '<rootDir>/libs/ng-application-profile',
    '<rootDir>/libs/elastic',
    '<rootDir>/libs/transloco-langstring',
    '<rootDir>/libs/ng-yasgui',
    '<rootDir>/apps/docs-app',
    '<rootDir>/libs/permissions',
    '<rootDir>/libs/operation',
    '<rootDir>/libs/legi-cv',
    '<rootDir>/libs/json-model-graph',
    '<rootDir>/libs/material-icons',
    '<rootDir>/libs/legi-shared',
    '<rootDir>/libs/legi-styles',
    '<rootDir>/libs/user-action',
    '<rootDir>/libs/elastic-explorer',
    '<rootDir>/apps/elastic-explorer-chrome-extension',
    '<rootDir>/libs/i18n',
    '<rootDir>/libs/i18n-transloco',
  ],
};
