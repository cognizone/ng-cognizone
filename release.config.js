const { readdirSync } = require('fs');
const { join } = require('path');

const libDist = join(__dirname, 'dist/libs');
const packagesRoots = readdirSync(libDist).map(dir => join(libDist, dir));

packagesRoots.push(join(__dirname, 'libs/cli'));

const npmPlugins = packagesRoots.map(pkgRoot => [
  '@semantic-release/npm',
  {
    pkgRoot,
  },
]);

module.exports = {
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'main',
    'next',
    'next-major',
    { name: 'rc', prerelease: true },
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    ...npmPlugins,
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'node ./tools/sync-versions.js',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'libs/*/package.json', 'libs/*/README.md'],
      },
    ],
  ],
};
