import { ExecutorContext } from '@nrwl/devkit';
import { existsSync } from 'fs';
import { join } from 'path';
import * as shell from 'shelljs';

interface ExecutorOptions {
  root: string;
  dist: string;
}

export default async function executor(options: ExecutorOptions, context: ExecutorContext) {
  console.info(`Executing "build-cli"...`);
  const rootPath = join(context.root, options.root);
  const distPath = join(context.root, options.dist);

  try {
    shell.rm('-rf', distPath);
    if (!existsSync(join(rootPath, 'node_modules'))) {
      shell.exec('npm ci', { cwd: rootPath });
    }

    // npm link doesn't behave nicely, so we copy those inside the node_modules of the cli instead
    ['application-profile', 'model-utils'].forEach(otherLib => {
      const otherLibDistPath = join(context.root, 'dist/libs', otherLib);
      const localNodeModulesPath = join(options.root, 'node_modules/@cognizone', otherLib);
      shell.rm('-rf', localNodeModulesPath);
      shell.mkdir('-p', localNodeModulesPath);
      shell.cp('-Rf', otherLibDistPath, join(localNodeModulesPath, '..'));
    });

    shell.exec('npm run build', { cwd: rootPath });
  } catch (err) {
    console.error('Failed to build project', err);
    return { success: false };
  }
  return { success: true };
}
