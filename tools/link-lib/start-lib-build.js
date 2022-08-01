const runAll = require('npm-run-all');

const options = require('./start-lib.config.json');

const scripts = options.libs.map(lib => `nx run ${lib}:build -- --watch --configuration=ivy --prod=true`);

runAll(scripts, { parallel: true, printLabel: false, stdout: process.stdout, stderr: process.stderr })
  .then(() => {
    console.log('done!');
  })
  .catch(err => {
    console.error('failed!', err);
  });
