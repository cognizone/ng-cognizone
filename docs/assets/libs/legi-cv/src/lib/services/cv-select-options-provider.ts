import {
  awaitForCompletable,
  GetSelectOptionsParams,
  Nil,
  SelectOption,
  SelectOptionGroup,
  SelectOptionsProvider
} from '@cognizone/model-utils';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Concept } from '../models/concept';
import { areConcepts, ConceptGroup, groupConcepts } from '../models/cv';

import { CvProvider } from './cv-provider';

export class CvSelectOptionsProvider implements SelectOptionsProvider<string> {
  constructor(private cvProvider: CvProvider) {}

  getOptions(query: Nil<string>, params: GetSelectOptionsParams): Observable<(SelectOption | SelectOptionGroup)[]> {
    return this.cvProvider.getCv(query, params).pipe(
      switchMap(cv => {
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
    return this.cvProvider.getConceptByUri(value).pipe(switchMap(concept => this.toSelectOption(concept)));
  }

  hasOptionFor(value: string): Observable<boolean> {
    return this.cvProvider.hasConcept(value);
  }

  private async toSelectOptionGroups(groups: ConceptGroup[]): Promise<SelectOptionGroup[]> {
    const optionGroups: SelectOptionGroup[] = [];
    for (const group of groups) {
      optionGroups.push(await this.toSelectOptionGroup(group));
    }

    return optionGroups;
  }

  private async toSelectOptionGroup(group: ConceptGroup): Promise<SelectOptionGroup> {
    return {
      label: group.label,
      options: await this.toSelectOptions(group.concepts)
    };
  }

  private async toSelectOptions(concepts: Concept[]): Promise<SelectOption[]> {
    const options: SelectOption[] = [];
    for (const concept of concepts) {
      options.push(await this.toSelectOption(concept));
    }

    return options;
  }

  private async toSelectOption(concept: Concept): Promise<SelectOption> {
    const value = concept['@id'];
    const label = await awaitForCompletable(this.cvProvider.getLabel(concept));

    return {
      label,
      value,
      disabled: concept.deprecated,
      data: { concept }
    };
  }
}