const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function writeJson(path, content) {
  writeFileSync(path, JSON.stringify(content, null, 2));
}

const cliPackagePath = join(__dirname, '../dist/libs/cli/package.json');
const cliPackage = readJson(cliPackagePath);

Object.keys(cliPackage.dependencies)
  .filter(key => key.startsWith('@cognizone'))
  .forEach(key => {
    const name = key.replace('@cognizone/', '');
    const depPackagePath = join(__dirname, `../dist/libs/${name}/package.json`);
    const depPackage = readJson(depPackagePath);
    cliPackage.dependencies[key] = `^${depPackage.version}`;
  });

delete cliPackage.scripts;

writeJson(cliPackagePath, cliPackage);
