import { Injectable } from '@angular/core';

import { LodContext } from '../models';
import { isCurie } from '../utils';

@Injectable({ providedIn: 'root' })
export class PrefixService {
  private context: LodContext = {
    prefix: {},
  };

  setContext(context: LodContext): void {
    this.context = context;
  }

  compactUri(uri: string, context: LodContext = this.context): string {
    if (isCurie(uri)) return uri;
    if (context.base && uri.startsWith(context.base)) return uri.replace(context.base, '');
    for (const [prefix, value] of Object.entries(context.prefix ?? {}).sort(([, v1], [, v2]) => v2.length - v1.length)) {
      const fullPrefix = this.getFullPrefix(prefix);
      if (uri.startsWith(value)) return uri.replace(value, fullPrefix);
    }
    return uri;
  }

  expandUri(uri: string, context: LodContext = this.context): string {
    if (!isCurie(uri)) return uri;
    for (const [prefix, value] of Object.entries(context.prefix ?? {})) {
      const fullPrefix = this.getFullPrefix(prefix);
      if (uri.startsWith(fullPrefix)) return uri.replace(fullPrefix, value);
    }
    if (context.base && !uri.includes(':')) return `${context.base}${uri}`;
    return uri;
  }

  convertUri(uri: string, srcContext: LodContext, distContext: LodContext): string {
    const expandedUri = this.expandUri(uri, srcContext);
    return this.compactUri(expandedUri, distContext);
  }

  private getFullPrefix(prefix: string): string {
    return prefix.endsWith(':') ? prefix : `${prefix}:`;
  }
}
