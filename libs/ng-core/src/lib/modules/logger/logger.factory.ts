import { Injectable } from '@angular/core';

import { Logger } from './logger.service';

@Injectable({ providedIn: 'root' })
export class LoggerFactory {
  create(namespace: string): Logger {
    return new Logger(namespace);
  }
}
