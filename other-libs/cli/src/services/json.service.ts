import { existsSync, readFileSync, writeFileSync } from 'fs';
import * as parser from 'jsonc-parser';
import { join, isAbsolute } from 'path';

export class JsonService {
  static readJsonSync<T extends {}>(path: string, options: ReadJsonOptions & { strict: true }): T;
  static readJsonSync<T extends {}>(path: string, options?: ReadJsonOptions & { strict?: false }): T | undefined;
  static readJsonSync<T extends {}>(path: string, options: ReadJsonOptions = {}): T | undefined {
    const cwd = options.cwd ?? process.cwd();
    path = isAbsolute(path) ? path : join(cwd, path);
    if (existsSync(path)) {
      const raw = readFileSync(path, 'utf8');
      return parser.parse(raw);
    } else if (options.strict) {
      throw new Error(`Could not find json file ${path}`);
    }
    return undefined;
  }

  static writeJsonSync(path: string, json: {}, { cwd = process.cwd() }: WriteJsonOptions = {}): void {
    path = isAbsolute(path) ? path : join(cwd, path);
    writeFileSync(path, JSON.stringify(json, null, 2), 'utf8');
  }
}

export interface ReadJsonOptions {
  cwd?: string;
  strict?: boolean;
}

export interface WriteJsonOptions {
  cwd?: string;
}
