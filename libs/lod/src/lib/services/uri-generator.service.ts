import { Injectable } from '@angular/core';
import { Many, manyToArray } from '@cognizone/model-utils';

import { LodOptionsService } from './lod-options.service';

@Injectable({ providedIn: 'root' })
export class UriGenerator {
  private counter = 0;

  constructor(private lodOptions: LodOptionsService) {}

  create(types: Many<string> | undefined, { isBlankNode }: UriCreationOptions = {}): string {
    const defaultTypesLabel = 'Thing';
    let typesLabel = manyToArray(types ?? defaultTypesLabel)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- pop always return an array of size >= 1
      .map(type => type.split(/[:#/]/).pop()!)
      .map(encodeURIComponent)
      .join('-');
    if (!typesLabel) typesLabel = defaultTypesLabel;

    let prefix = isBlankNode ? '_:' : this.lodOptions.getOptions().newUriPrefix;
    if (!isBlankNode && !prefix.endsWith('#') && !prefix.endsWith('/')) {
      prefix = `${prefix}/`;
    }
    return `${prefix}${typesLabel}/${this.counter++}-${Date.now()}`;
  }

  isNewUri(uri: string): boolean {
    return uri.startsWith(this.lodOptions.getOptions().newUriPrefix);
  }
}

export interface UriCreationOptions {
  isBlankNode?: boolean;
}
