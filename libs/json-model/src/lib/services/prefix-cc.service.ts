import { Injectable } from '@angular/core';
import { KNOWN_PREFIXES, TypedResourceContext } from '@cognizone/model-utils';

import { isCurie } from '../utils';

@Injectable({ providedIn: 'root' })
export class PrefixCcService {
  globalContext: TypedResourceContext = {
    prefix: KNOWN_PREFIXES,
  };

  setGlobalContext(context: TypedResourceContext): void {
    this.globalContext = context;
  }

  compactUri(uri: string, context: TypedResourceContext = this.globalContext): string {
    if (isCurie(uri)) return uri;
    for (const [prefix, value] of Object.entries(context.prefix ?? {})) {
      const fullPrefix = this.getFullPrefix(prefix);
      if (uri.startsWith(value)) return uri.replace(value, fullPrefix);
    }
    if (context.base && uri.startsWith(context.base)) return uri.replace(context.base, '');
    return uri;
  }

  expandUri(uri: string, context: TypedResourceContext = this.globalContext): string {
    if (!isCurie(uri)) return uri;
    for (const [prefix, value] of Object.entries(context.prefix ?? {})) {
      const fullPrefix = this.getFullPrefix(prefix);
      if (uri.startsWith(fullPrefix)) return uri.replace(fullPrefix, value);
    }
    if (context.base) return `${context.base}${uri}`;
    return uri;
  }

  convertUri(uri: string, srcContext: TypedResourceContext, distContext: TypedResourceContext): string {
    const expandedUri = this.expandUri(uri, srcContext);
    return this.compactUri(expandedUri, distContext);
  }

  private getFullPrefix(prefix: string): string {
    return prefix.endsWith(':') ? prefix : prefix + ':';
  }
}
