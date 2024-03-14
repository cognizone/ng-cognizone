# Ng-Cognizone

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

## Migrating from v3.11 to v3.12

- `@cognizone/json-ld/core`, `@cognizone/lod/core` and `@cognizone/shacl/core` respectively moved to dedicated packages `@cognizone/json-ld-core`, `@cognizone/lod-core` and `@cognizone/shacl-core`.
- A few duplicate entities from `@cognizone/shacl` have been removed in favour of their `@cognizone/shacl-core` equivalent
- Removed `Memoizer` from `@cognizone/shacl-core`, now it is only available through `@cognizone/shacl`

## Migrating from v3.8 to v3.9

- json-ld, lod and shacl libs have new core and/or ng-core sub entry points. This was made it so that \*/core one don't depend on Angular artifacts, so that they can be used in NodeJs environments. When migrating, it will just require to change a few imports

## Migrating from v3.6 to v3.7

- json-model: `IdGenerator` as been removed, need to use `UriGenerator` from `@cognizone/lod` instead. Be sure to properly configure the `newUriPrefix` option.
- json-model: `PrefixCcService` as been removed, need to use `PrefixService` from `@cognizone/lod` instead. If you are using json model, you will most likely want to initialize the context of PrefixService with something like this

```ts
inject(PrefixService).setContext({ prefix: KNOWN_PREFIXES }); // KNOWN_PREFIXES coming from @cognizone/lod
```

## Migrating from v3.3 to v3.4

- cz-select: to pass a dedicated ngTemplate to display options, need to give it the #optionTpl identifier to not overlap with cz-label transclusion when used.

## Migrating from v2 to v3

- JsonModel and related types, services and utilities have been moved to @cognizone/json-model, so this library need to be added and imports need to be adapted
- `JsonModel::@context` is now typed as `TypedResourceContext`, which is completely different from the previous typing. If ever you were using `rootUri` or `isNew`, you will need to find another way to get that info.
- `RootUriDirective::apName` has been removed and doesn't need to be set anymore. This is because GraphService::setGraph was already taking apName/definition as argument, and so it was redundant to duplicate this information in this directive.
- `RootUriDirective::getWrapper` has been deprecated. Instead, it's advised to inject `UrisStoreService` instead which has the same method and functionalities.
