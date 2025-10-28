import { inject, Injectable, Injector } from '@angular/core';

import { Logger } from './logger.service';
import { provideLogger } from './provide-logger';

@Injectable({ providedIn: 'root' })
export class LoggerFactory {
  private injector = inject(Injector);

  create(namespace?: string): Logger {
    const injectionContext = namespace
      ? Injector.create({
          providers: [provideLogger(namespace)],
          parent: this.injector,
        })
      : this.injector;

    return injectionContext.get(Logger);
  }
}
