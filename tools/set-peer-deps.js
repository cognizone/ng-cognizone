const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

// Hardcoded dependency version mappings
const DEPENDENCY_VERSIONS = {
  '@cognizone/': '>=7.0.0-beta.1',
  '@ngxs/': '>=20.0.0',
  '@angular/': '>=20.0.0 <21',
  rxjs: '^7.8.0',
  tslib: '^2.3.0',
};

const libsDir = join(__dirname, '../libs');

/**
 * Read and parse a JSON file
 */
function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

/**
 * Write JSON content to a file with formatting
 */
function writeJson(path, content) {
  writeFileSync(path, JSON.stringify(content, null, 2) + '\n', 'utf8');
}

/**
 * Get the version for a dependency based on hardcoded mappings
 */
function getVersionForDependency(dependencyName) {
  // Check for prefix matches
  for (const [prefix, version] of Object.entries(DEPENDENCY_VERSIONS)) {
    if (dependencyName.startsWith(prefix)) {
      return version;
    }
  }
  // Check for exact matches
  if (DEPENDENCY_VERSIONS[dependencyName]) {
    return DEPENDENCY_VERSIONS[dependencyName];
  }
  return null;
}

/**
 * Update peer and optional dependencies in a package.json
 */
function updateDependencies(packageJson) {
  let updated = false;
  const dependencyTypes = ['peerDependencies', 'optionalDependencies'];

  dependencyTypes.forEach(depType => {
    if (!packageJson[depType]) {
      return;
    }

    Object.keys(packageJson[depType]).forEach(depName => {
      const newVersion = getVersionForDependency(depName);
      if (newVersion && packageJson[depType][depName] !== newVersion) {
        console.log(`  Updating ${depType}.${depName}: ${packageJson[depType][depName]} -> ${newVersion}`);
        packageJson[depType][depName] = newVersion;
        updated = true;
      }
    });
  });

  return updated;
}

/**
 * Process all package.json files in libs directory
 */
function processLibraries() {
  console.log('Scanning libraries in:', libsDir);

  const dirs = readdirSync(libsDir)
    .filter(dir => !dir.startsWith('.') && dir !== 'cli')
    .map(dir => join(libsDir, dir));

  let totalUpdated = 0;

  dirs.forEach(dir => {
    const packageJsonPath = join(dir, 'package.json');

    try {
      const packageJson = readJson(packageJsonPath);
      console.log(`\nProcessing: ${packageJson.name || dir}`);

      const updated = updateDependencies(packageJson);

      if (updated) {
        writeJson(packageJsonPath, packageJson);
        totalUpdated++;
        console.log('  ✓ Updated');
      } else {
        console.log('  ✓ No changes needed');
      }
    } catch (error) {
      console.warn(`  ⚠ Warning: Could not process ${packageJsonPath}:`, error.message);
    }
  });

  console.log(`\n✓ Done! Updated ${totalUpdated} package(s)`);
}

// Run the script
if (require.main === module) {
  processLibraries();
}

module.exports = { processLibraries, updateDependencies, getVersionForDependency };
