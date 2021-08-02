import { ExecutorContext } from '@nrwl/devkit';
import { join } from 'path';
import * as shell from 'shelljs';

export interface EchoExecutorOptions {
  root: string;
  dist: string;
}

export default async function echoExecutor(options: EchoExecutorOptions, context: ExecutorContext) {
  console.info(`Executing "build-assets"...`);
  const rootPath = join(context.root, options.root);
  const distPath = join(context.root, options.dist);

  try {
    shell.rm('-rf', distPath);
    (shell.cp as any)('-Rf', rootPath, distPath);
  } catch (err) {
    console.error('Failed to copyfiles', err);
    return { success: false };
  }
  return { success: true };
}
