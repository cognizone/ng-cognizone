# Ng-Cognizone

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@cognizone/mylib`.

`nx generate @nrwl/angular:library <LIB_NAME> --buildable --publishable --importPath="@cognizone/<LIB_NAME>"`

## Developing in an external app

Chances are, you're adding a feature or resolving a bug for an app, so here is how to "connect" the lib dev to the actual app.

- copy the file `tools\link-lib\start-lib.config.example.json` and name that copy `tasks\start-lib.config.json`. You can adapt this file as follow:

```jsonc
{
  "appPath": "E:/your/project/path/frontend", // absolute path to the root of the frontend app you're working on
  "libs": ["legi-shared"] // the list of libs you are currently working on, those are the name of the folders inside /projects/libs
}
```

- First, make sure to disable cache in your project, under your project's directory, run `ng config cli.cache.enabled false`

- Now you can open 2 terminals in the root of the lib, and you will run both `npm run start:build` and `npm run start:sync`
-
- Once the npm run start:build has stabilized, you can run your classic `npm start` in your favorite app, it was already running

- make sure to stop/restart your `npm start` every time you need to update your project with latest changes

And there you have it, now make sure to restart your project compiler whenever you make changes in library

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## ☁ Nx Cloud

### Computation Memoization in the Cloud

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.

## Migrating from v3.3 to v3.4

- cz-select: to pass a dedicated ngTemplate to display options, need to give it the #optionTpl identifier to not overlap with cz-label transclusion when used.

## Migrating from v2 to v3

- JsonModel and related types, services and utilities have been moved to @cognizone/json-model, so this library need to be added and imports need to be adapted
- `JsonModel::@context` is now typed as `TypedResourceContext`, which is completely different from the previous typing. If ever you were using `rootUri` or `isNew`, you will need to find another way to get that info.
- `RootUriDirective::apName` has been removed and doesn't need to be set anymore. This is because GraphService::setGraph was already taking apName/definition as argument, and so it was redundant to duplicate this information in this directive.
- `RootUriDirective::getWrapper` has been deprecated. Instead, it's advised to inject `UrisStoreService` instead which has the same method and functionalities.
