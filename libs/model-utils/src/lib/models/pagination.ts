/**
 * Generic pagination type, it originates from elastsic query, but it's better to use this interface everywhere we have pagiantion, to no mix it up with other kind of pagination, based on page number for example.
 */
export interface Pagination {
  /**
   * absolute index of the first item of the page
   */
  from: number;
  /**
   * Size of the page
   */
  size: number;
}
