# material-icons

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test material-icons` to execute the unit tests.

## Installation

First, you have to change the assets part of your angular.json file with the "glob" part here:

```json
"assets": [
  "src/favicon.ico",
  "src/assets",
  {
    "glob": "**/*",
    "input": "node_modules/@material-icons/svg/svg",
    "output": "./assets/material-icons/"
  }
],
```

You'll also have to install the svg lib as well `npm i @material-icons/svg`. Then you just need to add the module to your app/core module

```typescript
@NgModule({
  imports: [CognizoneMaterialIconsModule.forRoot({})]
})
export class CoreModule {}
```

## Usage

With this, icons have to use follow the svg method, so this type of usage

```html
<mat-icon>print</mat-icon>
```

should be replaced with

```html
<mat-icon svgIcon="print"></mat-icon>
```
