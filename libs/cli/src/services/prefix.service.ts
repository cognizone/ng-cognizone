import { Prefixes } from '@cognizone/application-profile';

export class PrefixService {
  shortenUri(uri: string, prefixes: Prefixes): string {
    const [key, value] = Object.entries(prefixes).find(([, v]) => uri.startsWith(v)) ?? [];

    return value && key ? uri.replace(value, `${key}:`) : uri;
  }
}
