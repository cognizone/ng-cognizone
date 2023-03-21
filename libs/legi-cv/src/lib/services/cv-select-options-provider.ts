import { Injectable } from '@angular/core';
import {
  awaitForCompletable,
  GetSelectOptionsParams,
  Nil,
  SelectOption,
  SelectOptionGroup,
  SelectOptionsProvider,
} from '@cognizone/model-utils';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Concept } from '../models/concept';
import { areConcepts, ConceptGroup, groupConcepts } from '../models/cv';

import { CvProvider } from './cv-provider';

@Injectable({ providedIn: 'root' })
export class CvSelectOptionsProviderFactory {
  create(cvProvider: CvProvider): SelectOptionsProvider<string> {
    return new CvSelectOptionsProvider(cvProvider);
  }
}

export class CvSelectOptionsProvider implements SelectOptionsProvider<string> {
  constructor(private cvProvider: CvProvider) {}

  getOptions(query: Nil<string>, params: GetSelectOptionsParams): Observable<(SelectOption | SelectOptionGroup)[]> {
    return this.cvProvider.getCv(query, params).pipe(
      switchMap(async cv => {
        if (areConcepts(cv)) {
          return this.toSelectOptions(cv);
        } else {
          const groups = groupConcepts(cv);
          return this.toSelectOptionGroups(groups);
        }
      })
    );
  }

  getValueOption(value: string): Observable<SelectOption> {
    return this.cvProvider.getConceptByUri(value).pipe(switchMap(async concept => this.toSelectOption(concept)));
  }

  hasOptionFor(value: string): Observable<boolean> {
    return this.cvProvider.hasConcept(value);
  }

  protected async toSelectOptionGroups(groups: ConceptGroup[]): Promise<SelectOptionGroup[]> {
    const optionGroups: SelectOptionGroup[] = [];
    for (const group of groups) {
      optionGroups.push(await this.toSelectOptionGroup(group));
    }

    return optionGroups;
  }

  protected async toSelectOptionGroup(group: ConceptGroup): Promise<SelectOptionGroup> {
    return {
      label: group.label,
      options: await this.toSelectOptions(group.concepts),
    };
  }

  protected async toSelectOptions(concepts: Concept[]): Promise<SelectOption[]> {
    const options: SelectOption[] = [];
    for (const concept of concepts) {
      options.push(await this.toSelectOption(concept));
    }

    return options;
  }

  protected async toSelectOption(concept: Concept): Promise<SelectOption> {
    const value = concept['@id'];
    const label = await awaitForCompletable(this.cvProvider.getLabel(concept));

    return {
      label,
      value,
      disabled: concept.deprecated,
      data: { concept },
    };
  }
}
