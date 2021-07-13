import { Inject, Injectable } from '@angular/core';

import { LogLevel } from './models/log-level';
import { LOGGER_NAMESPACE_TOKEN } from './models/logger-namespace.token';

// tslint:disable:no-console
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

  readonly localStorageKey: string = '[CZ] log';

  constructor(@Inject(LOGGER_NAMESPACE_TOKEN) public namespace: string) {
    const logLevels = this.getLogLevels();
    this.logLevel = Object.keys(logLevels).reduce<LogLevel>((level, key) => {
      try {
        const regexp = new RegExp(key as string);
        const newLogLevel = logLevels[key];
        return regexp.test(this.namespace) && newLogLevel < level ? newLogLevel : level;
      } catch (err) {
        console.error('failed to evaluate log level, keeping current', err);
        return level;
      }
    }, this.logLevel);
    this.bindToConsoleMethod('debug', LogLevel.DEBUG);
    this.bindToConsoleMethod('log', LogLevel.LOG);
    this.bindToConsoleMethod('info', LogLevel.INFO);
    this.bindToConsoleMethod('warn', LogLevel.WARN);
    this.bindToConsoleMethod('error', LogLevel.ERROR);
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

  private bindToConsoleMethod(logType: keyof Console & keyof Logger, logLevel: LogLevel): void {
    if (this.logLevel <= logLevel) {
      this[logType] = console[logType].bind(console, this.prefix);
    } else {
      this[logType] = () => void 0;
    }
  }

  private getLogLevels(): { [key: string]: LogLevel } {
    const value = localStorage.getItem(this.localStorageKey);
    if (!value) {
      const initialValue = { [`^[${this.escapeRegExp(this.namespace)}.*]`]: LogLevel.INFO };
      localStorage.setItem(this.localStorageKey, JSON.stringify(initialValue));
      return initialValue;
    } else {
      try {
        const jsonValue = JSON.parse(value);
        Object.keys(jsonValue)
          .filter(key => typeof jsonValue[key] === 'string')
          .forEach(key => {
            const val: keyof LogLevel = jsonValue[key];
            // tslint:disable-next-line: no-any
            jsonValue[key] = (LogLevel as any)[val];
          });
        return jsonValue;
      } catch (error) {
        console.warn('[CZ] failed to parse JSON in local storage, resetting');
        localStorage.removeItem(this.localStorageKey);
        return this.getLogLevels();
      }
    }
  }

  private escapeRegExp(text: string): string {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
}
