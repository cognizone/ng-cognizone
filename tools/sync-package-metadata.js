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
const cognizonePeerVersion = '>=4.0.0-beta.0';
const angularPeerVersion = '^15.0.0';
const rootPackagePath = join(__dirname, '../package.json');
const rootPackage = readJson(rootPackagePath);

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
    if (key.startsWith('@angular/')) {
      package.peerDependencies[key] = angularPeerVersion;
    }
  });
  rootPackage.version = package.version;

  writeJson(packageFile, package);
});

writeJson(rootPackagePath, rootPackage);
