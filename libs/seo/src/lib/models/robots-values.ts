// https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag checked on 2023-10-19
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RobotsValues = {
  ALL: 'all',
  NO_INDEX: 'noindex',
  NO_FOLLOW: 'nofollow',
  NONE: 'none',
  NO_ARCHIVE: 'noarchive',
  NO_SITE_LINKS_SEARCH_BOX: 'nositelinkssearchbox',
  NO_SNIPPET: 'nosnippet',
  INDEX_IF_EMBEDDED: 'indexifembedded',
  MAX_SNIPPET: (value: number) => `max-snippet:${value}`,
  MAX_IMAGE_PREVIEW: (value: 'large' | 'none' | 'standard') => `max-image-preview:${value}`,
  MAX_VIDEO_PREVIEW: (value: number) => `max-video-preview:${value}`,
  NO_TRANSLATE: 'notranslate',
  /**
   * @param value should be date or dateTime, ideally ISO 8601
   */
  UNAVAILABLE_AFTER: (value: string) => `unavailable_after:${value}`,
  NO_IMAGE_INDEX: 'noimageindex',
} as const;
