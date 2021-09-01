import { Inject, Injectable } from '@angular/core';

import { LogLevel } from './models/log-level';
import { LOGGER_NAMESPACE_TOKEN } from './models/logger-namespace.token';

export type LogFunction = (...args: unknown[]) => void;

@Injectable({ providedIn: 'root' })
export class Logger {
  // we use the `.bind` method to keep the correct line in the logs
  debug!: LogFunction;

  log!: LogFunction;

  info!: LogFunction;

  warn!: LogFunction;

  error!: LogFunction;

  logLevel: LogLevel = LogLevel.NONE;

  constructor(@Inject(LOGGER_NAMESPACE_TOKEN) public namespace: string) {
    this.bindToConsoleMethod('debug');
    this.bindToConsoleMethod('log');
    this.bindToConsoleMethod('info');
    this.bindToConsoleMethod('warn');
    this.bindToConsoleMethod('error');
  }

  extend(namespace: string): Logger {
    if (this.namespace && namespace) {
      namespace = `${this.namespace}:${namespace}`;
    }
    return new Logger(namespace);
  }

  private get prefix(): string {
    return this.namespace ? `[${this.namespace}]` : '';
  }

  private bindToConsoleMethod(logType: keyof Console & keyof Logger): void {
    // eslint-disable-next-line no-console
    this[logType] = console[logType].bind(console, this.prefix);
  }
}
