import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UriEncoder {
  encode(uri: string): string {
    return btoa(uri);
  }
  decode(raw: string): string {
    return atob(raw);
  }
}
