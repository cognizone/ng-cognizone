/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/dot-notation */
import { InjectionToken } from '@angular/core';

import produce from 'immer';
import { MetaDescriptor } from './meta-descriptor';
import { MetaId } from './meta-id';
import { MetaIds } from './meta-ids';
import { Processors } from './processor';
import { MetaPropertyDirectiveProps } from './meta-property-directive-props';

export interface SeoOptions {
  metaDescriptors?: {
    [id: MetaId]: MetaDescriptor;
  };
  linkedKeys?: { [name: string]: MetaId[] };
  globalMetaPropertyDirectiveProps?: MetaPropertyDirectiveProps;
}

export const SEO_OPTIONS = new InjectionToken<SeoOptions>('SEO_OPTIONS', { factory: () => DEFAULT_SEO_OPTIONS });
export const OPINIONATED_TITLE_LENGTH = 60;
export const OPINIONATED_DESCRIPTION_LENGTH = 160;

export const DEFAULT_SEO_OPTIONS: SeoOptions = {
  metaDescriptors: {
    [MetaIds.TITLE_TAG]: {
      id: MetaIds.TITLE_TAG,
      multi: true
    },
    [MetaIds.CANONICAL_URL_LINK]: {
      id: MetaIds.CANONICAL_URL_LINK,
    },
    [MetaIds.HTML_PREFIX]: {
      id: MetaIds.HTML_PREFIX,
      multi: true,
      separator: ' ',
    },
    [MetaIds.ARTICLE_MODIFIED_TIME]: {
      id: MetaIds.ARTICLE_MODIFIED_TIME,
      keyAttribute: 'property',
    },
    [MetaIds.ARTICLE_PUBLISHED_TIME]: {
      id: MetaIds.ARTICLE_PUBLISHED_TIME,
      keyAttribute: 'property',
    },
    [MetaIds.DESCRIPTION]: {
      id: MetaIds.DESCRIPTION,
      keyAttribute: 'name',
      multi: true,
    },
    [MetaIds.KEYWORDS]: {
      id: MetaIds.KEYWORDS,
      keyAttribute: 'name',
    },
    [MetaIds.OG_DESCRIPTION]: {
      id: MetaIds.OG_DESCRIPTION,
      keyAttribute: 'property',
      multi: true,
    },
    [MetaIds.OG_IMAGE]: {
      id: MetaIds.OG_IMAGE,
      keyAttribute: 'property',
    },
    [MetaIds.OG_LOCALE]: {
      id: MetaIds.OG_LOCALE,
      keyAttribute: 'property',
    },
    [MetaIds.OG_SITE_NAME]: {
      id: MetaIds.OG_SITE_NAME,
      keyAttribute: 'property',
    },
    [MetaIds.OG_TITLE]: {
      id: MetaIds.OG_TITLE,
      keyAttribute: 'property',
      multi: true
    },
    [MetaIds.OG_TYPE]: {
      id: MetaIds.OG_TYPE,
      keyAttribute: 'property',
    },
    [MetaIds.OG_URL]: {
      id: MetaIds.OG_URL,
      keyAttribute: 'property',
    },
    [MetaIds.ROBOTS]: {
      id: MetaIds.ROBOTS,
      keyAttribute: 'name',
      multi: true,
      separator: ',',
    },
    [MetaIds.TWITTER_CARD]: {
      id: MetaIds.TWITTER_CARD,
      keyAttribute: 'name',
    },
    [MetaIds.TWITTER_DESCRIPTION]: {
      id: MetaIds.TWITTER_DESCRIPTION,
      keyAttribute: 'name',
      multi: true,
    },
    [MetaIds.TWITTER_IMAGE]: {
      id: MetaIds.TWITTER_IMAGE,
      keyAttribute: 'name',
    },
    [MetaIds.TWITTER_SITE]: {
      id: MetaIds.TWITTER_SITE,
      keyAttribute: 'name',
    },
    [MetaIds.TWITTER_TITLE]: {
      id: MetaIds.TWITTER_TITLE,
      keyAttribute: 'name',
      multi: true,
    },
  },
};

export function createOpinionatedOptions({ titleSuffix }: OpinionatedOptionsConfig): SeoOptions {
  return produce(DEFAULT_SEO_OPTIONS, draft => {
    draft.linkedKeys ??= {};
    draft.linkedKeys['title'] = [MetaIds.OG_TITLE, MetaIds.TWITTER_TITLE, MetaIds.TITLE_TAG];
    draft.metaDescriptors![MetaIds.TITLE_TAG].postProcessors = Processors.withMaxLength(OPINIONATED_TITLE_LENGTH, titleSuffix);
    draft.metaDescriptors![MetaIds.TITLE_TAG].metaPropertyDirectiveProps = { onDestroyStrategy: 'reset' };
    draft.metaDescriptors![MetaIds.TWITTER_TITLE].postProcessors = Processors.withMaxLength(OPINIONATED_TITLE_LENGTH);
    draft.metaDescriptors![MetaIds.TWITTER_TITLE].metaPropertyDirectiveProps = { onDestroyStrategy: 'reset' };
    draft.metaDescriptors![MetaIds.OG_TITLE].postProcessors = Processors.withMaxLength(OPINIONATED_TITLE_LENGTH);
    draft.metaDescriptors![MetaIds.OG_TITLE].metaPropertyDirectiveProps = { onDestroyStrategy: 'reset' };

    draft.linkedKeys['description'] = [MetaIds.DESCRIPTION, MetaIds.OG_DESCRIPTION, MetaIds.TWITTER_DESCRIPTION];
    draft.metaDescriptors![MetaIds.DESCRIPTION].postProcessors = Processors.withMaxLength(OPINIONATED_DESCRIPTION_LENGTH);
    draft.metaDescriptors![MetaIds.OG_DESCRIPTION].postProcessors = Processors.withMaxLength(OPINIONATED_DESCRIPTION_LENGTH);
    draft.metaDescriptors![MetaIds.TWITTER_DESCRIPTION].postProcessors = Processors.withMaxLength(OPINIONATED_DESCRIPTION_LENGTH);

    draft.linkedKeys['image'] = [MetaIds.OG_IMAGE, MetaIds.TWITTER_IMAGE];
    draft.linkedKeys['site'] = [MetaIds.OG_SITE_NAME, MetaIds.TWITTER_SITE];
    draft.linkedKeys['url'] = [MetaIds.OG_URL, MetaIds.CANONICAL_URL_LINK];
  });
}

export interface OpinionatedOptionsConfig {
  titleSuffix?: string;
}
