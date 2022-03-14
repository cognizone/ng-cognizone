import { Injectable } from '@angular/core';
import { getLangStringValue, LangString, LangStringSimple, Nil } from '@cognizone/model-utils';
import { I18nService } from '@cognizone/i18n';

import { Concept } from '../models/concept';
import { ConceptFilterableKeys } from '../models/concept-filterable-keys';
import { MatchType } from '../models/match-type';

@Injectable()
export class ConceptMatcherService {
  constructor(private i18nService: I18nService) {}

  match(concept: Concept, keys: ConceptFilterableKeys, query: Nil<string>, matchType: MatchType = 'includes'): number {
    if (!query) return 1;
    query = this.transformForComparison(query);
    const allLabels = this.getAllLabels(concept, keys);

    return allLabels.some(label => {
      label = this.transformForComparison(label);
      return matchType === 'includes' ? label.includes(query as string) : label.startsWith(query as string);
    })
      ? 1
      : 0;
  }

  /**
   * If the api is available, it will lower case the input and remove diacritics.
   * e.g. "Décret" => "decret"
   */
  transformForComparison(value: string): string {
    const normalized = value.normalize ? value.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : value;
    return normalized.toLowerCase();
  }

  getAllLabels(concept: Concept, keys: ConceptFilterableKeys): string[] {
    const lang = this.i18nService.getActiveLang().split('-')[0];
    const allLabels: string[] = [];
    keys
      .map(key => concept[key])
      .forEach(value => {
        if (!value) return;
        else if (typeof value === 'string') allLabels.push(value);
        else if (Array.isArray(value)) {
          const values = (value as unknown[]).filter(isString);
          allLabels.push(...values);
        } else {
          const langString = value as LangString | LangStringSimple;
          const label = getLangStringValue(langString, lang);
          if (label) allLabels.push(label);
        }
      });

    return allLabels;
  }
}

function isString(o: unknown): o is string {
  return typeof o === 'string';
}
