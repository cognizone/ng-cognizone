const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { join, dirname, relative } = require('path');

const libDist = join(__dirname, '../libs');
const packageFiles = readdirSync(libDist).map(dir => join(libDist, dir, 'package.json'));

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function writeJson(path, content) {
  writeFileSync(path, JSON.stringify(content, null, 2));
}
const cognizonePeerVersion = '>=3.0.0';
const rootPackage = readJson(join(__dirname, '../package.json'));

packageFiles.forEach(packageFile => {
  console.log('Syncing', packageFile);
  const package = readJson(packageFile);
  const directory = relative(join(__dirname, '..'), dirname(packageFile)).replace(/\\/g, '/');
  package.license = rootPackage.license;
  package.homepage = rootPackage.homepage;
  package.contributors = rootPackage.contributors;
  package.repository = { ...rootPackage.repository, directory };
  package.private = false;
  package.publishConfig = {
    access: 'public',
  };

  Object.keys(package.peerDependencies ?? {}).forEach(key => {
    if (key.startsWith('@cognizone/')) {
      package.peerDependencies[key] = cognizonePeerVersion;
    }
  });

  writeJson(packageFile, package);
});
