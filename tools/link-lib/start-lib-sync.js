const { join, sep } = require('path');
const chokidar = require('chokidar');
const copyfiles = require('copyfiles');
const shelljs = require('shelljs');
const debounce = require('lodash/debounce');

const options = require('./start-lib.config.json');

options.libs.forEach(lib => {
  const out = join(options.appPath, 'node_modules/@cognizone', lib);
  shelljs.rm('-rf', out);

  const paths = [];
  const distPath = join('./dist/libs', lib);

  const copyToApp = path => {
    paths.push(path);
    actualCopy(paths);
  };

  const actualCopy = debounce(paths => {
    copyfiles(
      [...paths, out],
      {
        up: distPath.split(sep).length,
      },
      err => {
        if (err) {
          console.error('Failed to copy files', paths, err);
        }
      }
    );
    paths.length = 0;
  }, 100);
  const watcher = chokidar.watch(distPath, { persistent: true });
  watcher.on('change', copyToApp).on('add', copyToApp);
});
