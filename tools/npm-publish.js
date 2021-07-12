const { readdirSync } = require('fs');
const { join } = require('path');
const npmPublish = require('@jsdevtools/npm-publish');

const libDist = join(__dirname, '../dist/libs');
const packageFiles = readdirSync(libDist).map(dir => join(libDist, dir, 'package.json'));

packageFiles.forEach(async package => {
  console.log('Publishing', package);
  await npmPublish({
    package,
    token: process.env.NPM_TOKEN,
    access: 'public',
    tag: 'alpha',
    dryRun: true
  });
});
