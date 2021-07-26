const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const libDist = join(__dirname, '../dist/libs');
const distPackageJsonFiles = readdirSync(libDist).map(dir => join(libDist, dir, 'package.json'));

distPackageJsonFiles.forEach(distPath => {
  const dist = JSON.parse(readFileSync(distPath));
  const srcPath = distPath.replace('/dist/', '/');
  const src = JSON.parse(readFileSync(srcPath));
  src.version = dist.version;
  console.log('Syncing version between dist and src package files', distPath, srcPath, dist.version);
  writeFileSync(srcPath, JSON.stringify(src, null, 2), 'utf8');
});
