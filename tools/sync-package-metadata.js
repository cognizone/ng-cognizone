const { readdirSync, readFileSync, writeFileSync, existsSync } = require('fs');
const { join, dirname, relative } = require('path');

const libDist = join(__dirname, '../libs');
const packageFiles = readdirSync(libDist)
  .filter(dir => !dir.startsWith('.') && dir !== 'cli')
  .map(dir => join(libDist, dir, 'package.json'));

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function writeJson(path, content) {
  writeFileSync(path, JSON.stringify(content, null, 2));
}
const cognizonePeerVersion = '>=7.0.0';
const angularVersion = '>=20.0.0';

const rootPackage = readJson(join(__dirname, '../package.json'));

packageFiles.forEach(packageFile => {
  if (!existsSync(packageFile)) {
    console.log('Package file does not exist, skipping', packageFile);
    return;
  }
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
