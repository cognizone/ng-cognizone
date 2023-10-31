# seo

## Setup in an app

### Setting options

Quite a few options are [present by default](./src/lib/models/seo-options.ts), but they can be completely overridden if necessary. A complete override can be done by either providing SEO_OPTIONS like so

```ts
@NgModule({
  providers: [
    provide: SEO_OPTIONS,
    useValue: {
      // here comes the options
    }
  ]
})
export class AppModule {}
```

Or making use of `SeoService::setOptions`.

A more subtle way to go about would be to modify the existing options, for example by making use of immer's produce function:

```ts
@Injectable()
export class MySeoInitService {
  private seoService = inject(SeoService);

  init(): void {
    const modifiedOptions = produce(this.seoService.getOptions(), draft => {
      // we need to specify the processor for each even if they are linked, as they would be updated with the raw value otherwise
      draft.metaDescriptors[MetaIds.TITLE_TAG].preProcessors = Processors.html();
      draft.metaDescriptors[MetaIds.OG_TITLE].preProcessors = Processors.html();
      draft.metaDescriptors[MetaIds.TWITTER_TITLE].preProcessors = Processors.html();
      // we don't set a suffix for other title-like properties so only <title> gets it
      draft.metaDescriptors[MetaIds.TITLE_TAG].postProcessors = Processors.withMaxLength(RECOMMENDED_TITLE_LENGTH, ' - MyAppName');

      draft.metaDescriptors[MetaIds.CANONICAL_URL_LINK].postProcessors = Processors.url({ forceW3: true });
      draft.metaDescriptors[MetaIds.OG_URL].postProcessors = Processors.url({ forceW3: true });
    });
    this.seoService.setOptions(modifiedOptions);
  }
}
```

You can also make use of our opinionated options, but it is then advised to use them as-is instead od using them as a base to be modified. This would then look like this:

```ts
@NgModule({
  providers: [
    provide: SEO_OPTIONS,
    useValue: createOpinionatedOptions({titleSuffix: ' | MyApp'})
  ]
})
export class AppModule {}
```

### Setting default values

There are most likely a few meta properties that are not meant to change at all and that should be present on all pages. For this, we can augment a bit our init logic seen in the previous section:

```ts
@Injectable()
export class MySeoInitService {
  private seoService = inject(SeoService);

  init(): void {
    // ...
    this.seoOptions.setMetaValue(MetaIds.OG_TYPE, 'website', { setAsDefault: true });
    this.seoOptions.setMetaValue(MetaIds.OG_SITE_NAME, 'My App', { setAsDefault: true });
    // no need to set twitter:image as, by default, og:image and twitter:image are linked together
    this.seoOptions.setMetaValue(MetaIds.OG_IMAGE, `https://path/to/image.png`, { setAsDefault: true });
    this.seoOptions.setMetaValue(MetaIds.TWITTER_CARD, 'summary', { setAsDefault: true });
    // etc.
  }
}
```

## Running unit tests

Run `nx test seo` to execute the unit tests.
