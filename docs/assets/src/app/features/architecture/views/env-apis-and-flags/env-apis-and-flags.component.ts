import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-env-apis-and-flags',
  templateUrl: './env-apis-and-flags.component.html',
  styleUrls: ['./env-apis-and-flags.component.scss'],
})
export class EnvApisAndFlagsComponent {
  lastUpdate: Date = new Date('2019-11-09');

  env1 = `
  // @env/environment.ts
  export const environment = {
    production: false,
    api: 'http://localhost:8080/api'
  };

  // @env/environment.prod.ts
  export const environment = {
    production: true,
    api: './api'
  };
  `;

  env2 = `
  // @env/environment.ts
  export const environment = {
    production: false,
    api: './api'
  };

  // @env/environment.prod.ts
  export const environment = {
    production: true,
    api: './api'
  };
  `;

  proxyConf = `
  // proxy.conf.js
  module.exports = [
    {
      context: [''],
      target: 'http://localhost:8080',
      // the bypass part might be useless for you depending on how your backend works
      bypass: function(req, res, proxyOptions) {
        if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
          console.log('Skipping proxy for browser request.');
          return '/index.html';
        }
      }
    }
  ];
  `;

  packageJson = `
  // package.json
  //...
  "scripts": {
    "start": "ng serve --proxy-config proxy.conf.js",
    //...
  },
  // ...
  `;

  routingModuleCode = `
  import { environment } from '@env/environment';

  const routes: Routes = [
    {
      path: 'ng-yasgui',
      loadChildren: () => import('./features/ng-yasgui-doc/ng-yasgui-doc.module')
        .then(m => m.NgYasguiDocModule)
    },
    environment.features.ngCore
      ? {
          path: 'ng-core',
          loadChildren: () => import('./features/ng-core-doc/ng-core-doc.module')
            .then(m => m.NgCoreDocModule)
        }
      : {
          path: 'ng-core',
          redirectTo: '/page-not-found'
        },
    environment.features.architecture === 'something'
      ? {
          path: 'architecture',
          loadChildren: () => import('./features/architecture/architecture.module')
            .then(m => m.ArchitectureModule)
        }
      : {
          path: 'architecture',
          loadChildren: () => import('./features/another-architecture/architecture.module')
            .then(m => m.ArchitectureModule)
        },
    {
      path: '**',
      component: PageNotFoundComponent
    }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
  `;
}
