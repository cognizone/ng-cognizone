import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Nil } from '@cognizone/model-utils';

import { HighlightMatch } from './highlight-match.service';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  constructor(private highlightMatch: HighlightMatch) {}

  transform(value: Nil<string>, query: Nil<string>, highlightedClass: string = 'is-highlighted'): Nil<SafeHtml> {
    if (value == null || query == null) return value;

    return this.highlightMatch.getMatchHighlighted(value, query, highlightedClass);
  }
}
