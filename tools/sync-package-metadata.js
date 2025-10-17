const { readdirSync, readFileSync, writeFileSync, statSync } = require('fs');
const { join, dirname, relative } = require('path');

const libDist = join(__dirname, '../libs');
const packageFiles = readdirSync(libDist)
  .filter(dir => !dir.startsWith('.'))
  .map(dir => join(libDist, dir, 'package.json'));

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function writeJson(path, content) {
  writeFileSync(path, JSON.stringify(content, null, 2));
}
const cognizonePeerVersion = '>=6.0.0 <7';
const angularVersion = '>=19.0.0 <20';

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

  ['peerDependencies', 'optionalDependencies'].forEach(dependencyType => {
    Object.keys(package[dependencyType] ?? {}).forEach(key => {
      if (key.startsWith('@cognizone/')) {
        package[dependencyType][key] = cognizonePeerVersion;
      }
      if (key.startsWith('@angular/')) {
        package[dependencyType][key] = angularVersion;
      }
    });
  });

  writeJson(packageFile, package);
});
