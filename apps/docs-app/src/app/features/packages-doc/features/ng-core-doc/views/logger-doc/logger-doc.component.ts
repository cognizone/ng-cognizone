import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { CoreStateFacade } from '@app/core/store/core.facade';
import { ApiDescription } from '@app/shared/components/api-table/api-table.component';
import { Logger } from '@cognizone/ng-core';

import { NgCorePagesService } from '../../services/ng-core-pages.service';

@Component({
  selector: 'app-logger-doc',
  templateUrl: './logger-doc.component.html',
  styleUrls: ['./logger-doc.component.scss'],
})
export class LoggerDocComponent implements OnInit, OnDestroy {
  form!: UntypedFormGroup;

  code1 = `
  // app.module.ts
  @NgModule(imports: [LoggerModule.forRoot('App')])
  export class AppModule() {}

  // data.service.ts
  @Injectable()
  export class DataService {
    constructor(private logger: Logger) {
      this.logger = logger.extend('DataService');
    }

    get(): void {
      this.logger.info('getting data');
    }
  }

  // app.component.ts
  @Component(/*...*/)
  export class AppComponent {
    constructor(private logger: Logger, private dataService: DataService) {
      this.logger = logger.extend('AppComponent');
    }

    ngOnInit() {
      this.logger.info('initialized');
      this.dataService.get();
    }
  }
  `;

  code2 = `
    {
      "^[App.*]": "WARN",
      ".*DataService.*": 0 // DEBUG
    }`;

  loggerModuleMethods: ApiDescription[] = [
    {
      name: 'static forRoot(namespace: string): ModuleWithProviders',
      description: 'import for the root of your application, "namespace" will be the namespace of the root Logger.',
    },
  ];

  loggerMethods: ApiDescription[] = [
    {
      name: 'debug(...args: unknown[]): void',
      description: `log input as console.debug(...) if logger's log level is >= 0 (DEBUG). Beware that your browser log level should accept "Verbose" level for you to see this kind of message`,
    },
    {
      name: 'log(...args: unknown[]): void',
      description: "log input as console.log(...) if logger's log level is >= 1 (LOG)",
    },
    {
      name: 'info(...args: unknown[]): void',
      description: "log input as console.info(...) if logger's log level is >= 2 (INFO)",
    },
    {
      name: 'warn(...args: unknown[]): void',
      description: "log input as console.warn(...) if logger's log level is >= 3 (WARN)",
    },
    {
      name: 'error(...args: unknown[]): void',
      description: "log input as console.error(...) if logger's log level is >= 4 (ERROR)",
    },
    {
      name: 'extend(namespace: string): Logger',
      description:
        "create a new logger which namespace extends the current one. For example, if the root Logger has a namespace 'App', calling logger.extend('Component') will result in a logger having the namespace 'App:Component'",
    },
  ];

  constructor(
    public readonly logger: Logger,
    private readonly fb: UntypedFormBuilder,
    private coreStateFacade: CoreStateFacade,
    private ngCorePagesService: NgCorePagesService
  ) {
    this.logger = logger.extend('LoggerDocComponent');
  }

  ngOnInit(): void {
    this.coreStateFacade.setPageTitle('@cognizone/ng-core', 'Logger');
    this.form = this.fb.group({
      logMessage: ['This is my message'],
    });
    this.ngCorePagesService.setPages();
  }

  ngOnDestroy(): void {
    this.coreStateFacade.resetPageTitle();
    this.ngCorePagesService.discardPages();
  }

  refreshPage(): void {
    location.reload();
  }
}
