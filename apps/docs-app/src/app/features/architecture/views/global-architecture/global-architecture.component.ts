import { Component } from '@angular/core';

@Component({
  selector: 'app-global-architecture',
  templateUrl: './global-architecture.component.html',
  styleUrls: ['./global-architecture.component.scss'],
})
export class GlobalArchitectureComponent {
  lastUpdate: Date = new Date('2019-12-06');

  exportImportCode = `
    // my-module/index.ts
    export * from './services/my-service';

    // another-module/components/a-component.ts
    import { MyService } from '@app/my-module';
  `;

  coreModuleCode = `
  @NgModule({
    declarations: [],
    imports: [
      CommonModule,
      GenericCasematesUiCoreModule.forRoot(),
      HttpClientModule,
      HttpClientXsrfModule.withOptions({ cookieName: 'XSRF-TOKEN' })
    ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: RestInterceptor, multi: true },
      CookieService,
      TranslateService
    ]
  })
  export class CoreModule {}
  `;

  sharedModuleCode = `
  const material = [
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ];
  
  const components = [ApiTableComponent, InlineCodeComponent, 
    CodeBlockComponent, AnchorNavComponent];
  const pipes = [EscapeHtmlPipe];
  const directives = [MatTabRoutedDirective, AnchorDirective];
  
  @NgModule({
    declarations: [components, pipes, directives],
    imports: [CommonModule, material, ReactiveFormsModule],
    exports: [material, components, pipes, directives, ReactiveFormsModule]
  })
  export class SharedModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: SharedModuleRoot,
        providers: [{ 
          provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, 
          useValue: { appearance: 'outline' } 
        }]
      };
    }
  }
  
  @NgModule({
    declarations: [],
    imports: [BrowserAnimationsModule, SharedModule],
    exports: [BrowserAnimationsModule, SharedModule]
  })
  export class SharedModuleRoot {}
  `;

  featureModuleCode = `
  @NgModule({
    declarations: [GettingStartedComponent, GlobalArchitectureComponent],
    imports: [CommonModule, ArchitectureRoutingModule, SharedModule]
  })
  export class ArchitectureModule {}
  `;
}
