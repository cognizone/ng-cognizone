/* eslint-disable @typescript-eslint/no-explicit-any */
import { DOCUMENT } from '@angular/common';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import produce from 'immer';

import { createOpinionatedOptions, MetaIds, Processors } from '../models';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  const createService = createServiceFactory({
    service: SeoService,
  });

  let spectator: SpectatorService<SeoService>;
  let seoService: SeoService;

  beforeEach(() => {
    spectator = createService();
    seoService = spectator.service;
    seoService.setOptions(createOpinionatedOptions({ titleSuffix: ' | MyApp' }));
  });

  it(`should exist`, () => {
    expect(spectator.service).toBeTruthy();
  });

  it(`should set a short title`, () => {
    const doc = spectator.inject(DOCUMENT);

    seoService.setTitle('This is a short title');

    expect(doc.title).toBe('This is a short title | MyApp');
    checkContentOfUniqueMetaTagWithProperty(MetaIds.OG_TITLE, 'This is a short title');
    checkContentOfUniqueMetaTagWithName(MetaIds.TWITTER_TITLE, 'This is a short title');
  });

  it(`should set a long title`, () => {
    const doc = spectator.inject(DOCUMENT);

    seoService.setTitle('This is a long title, like super long, way longer than what it should be');

    expect(doc.title).toBe('This is a long title, like super long, way longer... | MyApp');
    checkContentOfUniqueMetaTagWithProperty(MetaIds.OG_TITLE, 'This is a long title, like super long, way longer than wh...');
    checkContentOfUniqueMetaTagWithName(MetaIds.TWITTER_TITLE, 'This is a long title, like super long, way longer than wh...');
  });

  it(`should build a description`, () => {
    seoService.setMetaValue(MetaIds.DESCRIPTION, ['This is a description', 'with some stuff', 'inside it']);
    checkContentOfUniqueMetaTagWithName(MetaIds.DESCRIPTION, 'This is a description,with some stuff,inside it');
    checkContentOfUniqueMetaTagWithProperty(MetaIds.OG_DESCRIPTION, 'This is a description,with some stuff,inside it');
    checkContentOfUniqueMetaTagWithName(MetaIds.TWITTER_DESCRIPTION, 'This is a description,with some stuff,inside it');
  });

  it(`should build a description with preprocessor and post processor`, () => {
    spectator.service.setOptions(
      produce(spectator.service.getOptions(), (draft: any) => {
        draft.metaDescriptors[MetaIds.DESCRIPTION].preProcessors = (value: string) => `foo ${value}`;
        draft.metaDescriptors[MetaIds.DESCRIPTION].postProcessors = [Processors.withMaxLength(120)];
      })
    );
    const descriptionParts = [
      'This is a description',
      'with some stuff',
      'inside it',
      'and we need to make it longer',
      'than 160 characters but it is pretty hard damn it',
      'almost there, only a few more characters',
    ];

    const expectedDescription =
      'foo This is a description,foo with some stuff,foo inside it,foo and we need to make it longer,foo than 160 characters...';
    expect(expectedDescription.length).toBe(120); // 120 set above

    const expectedOther =
      'This is a description,with some stuff,inside it,and we need to make it longer,than 160 characters but it is pretty hard damn it,almost there, only a few more...';
    expect(expectedOther.length).toBe(160); // 160 is the default in config

    seoService.setMetaValue(MetaIds.DESCRIPTION, descriptionParts);
    checkContentOfUniqueMetaTagWithName(MetaIds.DESCRIPTION, expectedDescription);
    checkContentOfUniqueMetaTagWithProperty(MetaIds.OG_DESCRIPTION, expectedOther);
    checkContentOfUniqueMetaTagWithName(MetaIds.TWITTER_DESCRIPTION, expectedOther);
  });

  it(`should build a custom tag progressively`, () => {
    const metaId = 'custom';
    spectator.service.setOptions(
      produce(spectator.service.getOptions(), draft => {
        draft.metaDescriptors ??= {};
        draft.metaDescriptors[metaId] = {
          id: metaId,
          keyAttribute: 'name',
          multi: true,
          separator: '@@',
        };
      })
    );
    seoService.appendMetaValue(metaId, 'Description start');
    checkContentOfUniqueMetaTagWithName(metaId, 'Description start');

    const part2Cmd = seoService.appendMetaValue(metaId, 'part 2');
    checkContentOfUniqueMetaTagWithName(metaId, 'Description start@@part 2');

    seoService.appendMetaValue(metaId, ['part 3', 'part 4']);
    checkContentOfUniqueMetaTagWithName(metaId, 'Description start@@part 2@@part 3@@part 4');

    part2Cmd.update(['modified part 2', 'part 2.5']);
    checkContentOfUniqueMetaTagWithName(metaId, 'Description start@@part 3@@part 4@@modified part 2@@part 2.5');

    part2Cmd.remove();
    checkContentOfUniqueMetaTagWithName(metaId, 'Description start@@part 3@@part 4');
  });

  it(`should not append a non-multi attribute`, () => {
    const metaId = 'custom';
    spectator.service.setOptions(
      produce(spectator.service.getOptions(), draft => {
        draft.metaDescriptors ??= {};
        draft.metaDescriptors[metaId] = {
          id: metaId,
        };
      })
    );
    expect(() => seoService.appendMetaValue(metaId, 'foo')).toThrowError();
  });

  it(`should set canonical url`, () => {
    const doc = spectator.inject(DOCUMENT);
    const cmd = spectator.service.setCanonicalUrl('https://www.cogni.zone');
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://www.cogni.zone');
    checkContentOfUniqueMetaTagWithProperty(MetaIds.OG_URL, 'https://www.cogni.zone');

    cmd.update('https://www.cogni2.zone');
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://www.cogni2.zone');
    checkContentOfUniqueMetaTagWithProperty(MetaIds.OG_URL, 'https://www.cogni2.zone');

    cmd.remove();
    expect(doc.querySelector('link[rel="canonical"]')).not.toBeTruthy();
    checkContentOfUniqueMetaTagWithProperty(MetaIds.OG_URL, undefined);
  });

  it(`should correctly set defaults`, () => {
    seoService.setMetaValue(MetaIds.ARTICLE_MODIFIED_TIME, '2023-10-23');
    checkContentOfUniqueMetaTagWithProperty(MetaIds.ARTICLE_MODIFIED_TIME, '2023-10-23');

    seoService.reset();
    checkContentOfUniqueMetaTagWithProperty(MetaIds.ARTICLE_MODIFIED_TIME, undefined);

    seoService.setMetaValue(MetaIds.ARTICLE_MODIFIED_TIME, '2023-10-23', { setAsDefault: true });
    seoService.setMetaValue(MetaIds.ARTICLE_PUBLISHED_TIME, '2024-11-02');
    checkContentOfUniqueMetaTagWithProperty(MetaIds.ARTICLE_MODIFIED_TIME, '2023-10-23');
    checkContentOfUniqueMetaTagWithProperty(MetaIds.ARTICLE_PUBLISHED_TIME, '2024-11-02');

    seoService.reset();
    checkContentOfUniqueMetaTagWithProperty(MetaIds.ARTICLE_MODIFIED_TIME, '2023-10-23');
    checkContentOfUniqueMetaTagWithProperty(MetaIds.ARTICLE_PUBLISHED_TIME, undefined);
  });

  it(`should correctly sort parts`, () => {
    seoService.appendMetaValue(MetaIds.DESCRIPTION, {
      index: 3,
      value: 'part 3',
    });
    checkContentOfUniqueMetaTagWithName(MetaIds.DESCRIPTION, 'part 3');

    seoService.appendMetaValue(MetaIds.DESCRIPTION, {
      index: 1,
      value: 'part 1',
    });
    checkContentOfUniqueMetaTagWithName(MetaIds.DESCRIPTION, 'part 1,part 3');

    const part2Cmd = seoService.appendMetaValue(MetaIds.DESCRIPTION, {
      index: 2,
      value: 'part 2',
    });
    checkContentOfUniqueMetaTagWithName(MetaIds.DESCRIPTION, 'part 1,part 2,part 3');

    part2Cmd.remove();
    checkContentOfUniqueMetaTagWithName(MetaIds.DESCRIPTION, 'part 1,part 3');
  });

  function checkContentOfUniqueMetaTagWithName(name: string, expectedContent: string): void {
    const doc = spectator.inject(DOCUMENT);
    const metas = doc.querySelectorAll(`meta[name='${name}']`);
    expect(metas.length).toBe(1);
    expect(metas[0].getAttribute('content')).toBe(expectedContent);
  }

  function checkContentOfUniqueMetaTagWithProperty(property: string, expectedContent: string | undefined): void {
    const doc = spectator.inject(DOCUMENT);
    const metas = doc.querySelectorAll(`meta[property='${property}']`);
    expect(metas.length).toBeLessThanOrEqual(1);
    expect(metas[0]?.getAttribute('content')).toBe(expectedContent);
  }
});
