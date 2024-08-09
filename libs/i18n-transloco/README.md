# i18n-transloco

## Installation

Make use of the provided `provideI18nTransloco` function, in either the app.config of the app:

```ts
export const appConfig: ApplicationConfig = {
  providers: [
    // ... other imports
    provideI18nTransloco(),
  ],
};
```

Or in an NgModule like core, or directly the app one:

```ts
@NgModule({
  providers: [provideI18nTransloco()],
})
export class CoreModule {}
```

## Running unit tests

Run `nx test i18n-transloco` to execute the unit tests.
