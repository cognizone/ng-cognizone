import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CvService } from '@cognizone/legi-cv';
import { Many, manyToArray } from '@cognizone/model-utils';
import { JsonModel, JsonModelService } from '@cognizone/json-model';
import { ApHelper, ApService } from '@cognizone/ng-application-profile';
import produce from 'immer';
import { isEqual } from 'lodash-es';
import { merge, Observable } from 'rxjs';
import { filter, finalize, map, switchMap, tap } from 'rxjs/operators';

import { GraphService } from './graph.service';

@Injectable({ providedIn: 'root' })
export class GraphAndControlLinkingService {
  constructor(
    private graphService: GraphService,
    private cvService: CvService,
    private jsonModelService: JsonModelService,
    private fb: FormBuilder,
    private apHelper: ApHelper,
    private apService: ApService
  ) {}

  /**
   *
   * @description at first, the form is updated without emitEvent: false to ensure that local logic in the component is
   * triggered by the first time the node values are applied
   */
  linkControlToNodeAttribute<T extends JsonModel>({
    rootUri,
    nodeUri,
    attributeKey,
    control,
    apName,
    cvName,
    classId,
    emitEventFromNodeToForm,
  }: LinkControlToNodeAttributeOptions<T>): Observable<unknown> {
    const current = this.graphService.getNodeSnapshot<T>(rootUri, nodeUri);
    const val = current[attributeKey];
    this.patchValue(val, control, true);

    const formToNode$ = control.valueChanges.pipe(
      switchMap(async value => {
        const allUpdatedNodes = [];
        const node = this.graphService.getNodeSnapshot<T>(rootUri, nodeUri);
        if (!node) return;
        if (isEqual(node[attributeKey], value)) return;
        allUpdatedNodes.push(
          produce(node, (draft: T) => {
            draft[attributeKey] = value ?? undefined;
          })
        );
        if (this.isReference({ apName, attributeKey: attributeKey as keyof JsonModel, nodeUri, rootUri })) {
          const references = await this.addReferencesInGraph(value, { apName, cvName, classId, rootUri });
          allUpdatedNodes.push(...references);
        }

        this.graphService.update(rootUri, ...allUpdatedNodes);
      })
    );
    const nodeToForm$ = this.graphService.getNode<T>(rootUri, nodeUri).pipe(
      filter(node => node != null),
      tap(node => this.patchValue(node[attributeKey], control, emitEventFromNodeToForm ?? false))
    );

    return merge(formToNode$, nodeToForm$).pipe(finalize(() => control.reset(undefined, { emitEvent: false })));
  }

  updateFormArray<T>(
    values$: Observable<T[]>,
    formArray: FormArray,
    controlBuilder: (value: T) => AbstractControl = value => this.fb.control(value)
  ): Observable<void> {
    return values$.pipe(
      map(values => {
        if (formArray.length === values.length) {
          return;
        } else if (formArray.length > values.length) {
          const formValues = formArray.value as T[];
          formValues
            .map((value, index) => (values.includes(value) ? -1 : index))
            .filter(index => index >= 0)
            .sort((a, b) => b - a)
            .forEach(index => formArray.removeAt(index));
        } else {
          const formValues = formArray.value ?? ([] as T[]);
          values
            .map((value, index) => (formValues.includes(value) ? -1 : index))
            .filter(index => index >= 0)
            .forEach(index => formArray.insert(index, controlBuilder(values[index])));
        }
      })
    );
  }

  private isReference({
    apName,
    attributeKey,
    nodeUri,
    rootUri,
  }: Pick<LinkControlToNodeAttributeOptions<JsonModel>, 'apName' | 'attributeKey' | 'nodeUri' | 'rootUri'>): boolean {
    const node = this.graphService.getNodeSnapshot(rootUri, nodeUri);
    return this.apHelper.isReference(apName, node['@type'], attributeKey);
  }

  private async addReferencesInGraph(
    value: Many<string>,
    { rootUri, apName, cvName, classId }: LinkReferenceOptions
  ): Promise<JsonModel[]> {
    const graph = this.graphService.getGraphSnapshot(rootUri);
    const newModels: JsonModel[] = [];
    const uris = manyToArray(value);
    if (!cvName && !classId) {
      throw new Error('Either cvName or classId need to be given to create a new reference');
    }

    for (const uri of uris) {
      if (graph.models[uri] || !uri) continue;
      const actualClassId = classId ?? (await this.getClassId(uri, cvName as Many<string>));

      const model = this.jsonModelService.createNewJsonModel(actualClassId, apName, rootUri);
      model['@id'] = uri;
      newModels.push(model);
    }

    return newModels;
  }

  private async getClassId(uri: string, cvNames: Many<string>): Promise<Many<string>> {
    for (const cvName of manyToArray(cvNames)) {
      const provider = this.cvService.getProvider(cvName);
      const hasOption = await provider.hasConcept(uri).toPromise();
      if (!hasOption) continue;
      return (await provider.getConceptByUri(uri).toPromise())['@type'];
    }

    throw new Error(`Could not find classId for option '${uri}'`);
  }

  private patchValue(value: unknown, control: AbstractControl, emitEvent: boolean): void {
    if (value === control.value) return;
    else if (control instanceof FormArray) {
      control.patchValue((value as unknown[]) ?? [], { emitEvent });
    } else if (control instanceof FormGroup) {
      control.patchValue((value as {}) ?? {}, { emitEvent });
    } else {
      control.patchValue(value, { emitEvent });
    }
  }
}

export interface LinkReferenceOptions {
  rootUri: string;
  apName: string;
  cvName?: Many<string>;
  classId?: string;
}

export interface LinkControlToNodeAttributeOptions<T> {
  rootUri: string;
  nodeUri: string;
  attributeKey: keyof T;
  control: AbstractControl;
  apName: string;
  cvName?: Many<string>;
  classId?: string;
  emitEventFromNodeToForm?: boolean;
}
