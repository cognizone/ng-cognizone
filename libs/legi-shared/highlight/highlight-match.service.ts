import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Nil } from '@cognizone/model-utils';

@Injectable()
export class HighlightMatch {
  constructor(private sanitizer: DomSanitizer) {}

  getMatchHighlighted(value: string, query: string, highlightedClass: string): Nil<SafeHtml> {
    const index = value.toLowerCase().indexOf(query.toLowerCase());

    if (index < 0) return this.sanitizer.bypassSecurityTrustHtml(value);

    const start = value.slice(0, index);
    const middle = value.slice(index, index + query.length);
    const end = value.slice(index + query.length);
    return this.sanitizer.bypassSecurityTrustHtml(`${start}<span class="${highlightedClass}">${middle}</span>${end}`);
  }
}
