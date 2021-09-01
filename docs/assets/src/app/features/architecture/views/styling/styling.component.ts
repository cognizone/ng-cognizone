import { Component } from '@angular/core';

@Component({
  selector: 'app-styling',
  templateUrl: './styling.component.html',
  styleUrls: ['./styling.component.scss'],
})
export class StylingComponent {
  lastUpdate: Date = new Date('2019-11-20');

  badImportsScss = `
  // shared/components/my-component/my-component.scss
  @import '../../../../styles/abstracts/variables';
  @import '../../../../styles/abstracts/mixins';
  // ...
  `;

  angularJsonImports = `
  // ...
  "architect": {
    "build": {
      "builder": "@angular-devkit/build-angular:browser",
      "options": {
        "outputPath": "dist/docs-app",
        "index": "projects/docs-app/src/index.html",
        "main": "projects/docs-app/src/main.ts",
        "polyfills": "projects/docs-app/src/polyfills.ts",
        "tsConfig": "projects/docs-app/tsconfig.app.json",
        "aot": false,
        "assets": ["projects/docs-app/src/favicon.ico", "projects/docs-app/src/assets"],
        "stylePreprocessorOptions": { "includePaths": ["projects/docs-app/src/styles"] }, // THIS IS THE KEY PART
        "styles": ["projects/docs-app/src/styles/main.scss"],
        "scripts": []
      },
      // ...
    },
    // ...
  `;

  angularJsonDarkTheme1 = `
  // under "configurations"
  "production-dark": {
    "fileReplacements": [
      {
        "replace": "projects/docs-app/src/environments/environment.ts",
        "with": "projects/docs-app/src/environments/environment.prod.ts"
      }
    ],
    "tsConfig": "projects/docs-app/tsconfig.prod.json",
    "optimization": true,
    "outputHashing": "all",
    "sourceMap": false,
    "extractCss": true,
    "namedChunks": true,
    "aot": true,
    "extractLicenses": true,
    "vendorChunk": false,
    "buildOptimizer": true,
    "budgets": [
      {
        "type": "initial",
        "maximumWarning": "2mb",
        "maximumError": "5mb"
      },
      {
        "type": "anyComponentStyle",
        "maximumWarning": "6kb",
        "maximumError": "10kb"
      }
    ],
    "stylePreprocessorOptions": { "includePaths": ["projects/docs-app/src/styles/themes/dark", "projects/docs-app/src/styles"] },
    "styles": ["projects/docs-app/src/styles/themes/dark/main.scss"]
  },
  "dark": {
    "stylePreprocessorOptions": { "includePaths": ["projects/docs-app/src/styles/themes/dark", "projects/docs-app/src/styles"] },
    "styles": ["projects/docs-app/src/styles/themes/dark/main.scss"]
  }
  // ...
  // under "serve"
  "dark": {
    "browserTarget": "docs-app:build:dark"
  }
  `;

  darkThemeScripts = `
    ng serve --configuration=dark
    ng build --configuration=production-dark
  `;

  darkThemeScripts9 = `
    ng serve --configuration=dark
    ng build --configuration=production,dark
  `;

  bootstrapScss = `
  // src/styles/vendors/_bootstrap.scss
  // Configuration
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";

  // Layout & components
  @import "~bootstrap/scss/root";
  @import "~bootstrap/scss/reboot";
  @import "~bootstrap/scss/type";
  @import "~bootstrap/scss/images";
  @import "~bootstrap/scss/grid";
  // parts about table, buttons and others are not imported because we don't use them

  // Utilities
  @import "~bootstrap/scss/utilities";
  `;
}
