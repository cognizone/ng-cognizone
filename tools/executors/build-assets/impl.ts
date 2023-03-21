import { ExecutorContext } from '@nrwl/devkit';
import { join } from 'path';
import * as shell from 'shelljs';

interface ExecutorOptions {
  root: string;
  dist: string;
}

export default async function executor(options: ExecutorOptions, context: ExecutorContext) {
  console.info(`Executing "build-assets"...`);
  const rootPath = join(context.root, options.root);
  const distPath = join(context.root, options.dist);

  try {
    shell.rm('-rf', distPath);
    shell.mkdir('-p', distPath);
    shell.cp('-Rf', rootPath, join(distPath, '..'));
  } catch (err) {
    console.error('Failed to copyfiles', err);
    return { success: false };
  }
  return { success: true };
}
