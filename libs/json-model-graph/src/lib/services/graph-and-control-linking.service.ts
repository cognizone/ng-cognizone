import { Inject, Injectable } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { DATA_MODEL_DEFINITION_HELPER_TOKEN, DataModelDefinitionHelper, JsonModel, JsonModelService } from '@cognizone/json-model';
import { CvService } from '@cognizone/legi-cv';
import { Many, manyToArray, notNil } from '@cognizone/model-utils';
import produce from 'immer';
import { isEqual, get, set } from 'lodash-es';
import { merge, Observable } from 'rxjs';
import { filter, finalize, map, switchMap, tap } from 'rxjs/operators';

import { GraphService } from './graph.service';

@Injectable({ providedIn: 'root' })
export class GraphAndControlLinkingService {
  constructor(
    private graphService: GraphService,
    private cvService: CvService,
    private jsonModelService: JsonModelService,
    private fb: UntypedFormBuilder,
    @Inject(DATA_MODEL_DEFINITION_HELPER_TOKEN)
    private dataModelDefinitionHelper: DataModelDefinitionHelper
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
    definition,
    cvName,
    classId,
    innerPath,
    emitEventFromNodeToForm,
  }: LinkControlToNodeAttributeOptions<T>): Observable<unknown> {
    const currentNode = this.graphService.getNodeSnapshot<T>(rootUri, nodeUri);
    const val = this.getValue<T>(currentNode as T, { attributeKey, innerPath });
    this.patchControlValue(val, control, true);

    const formToNode$ = control.valueChanges.pipe(
      switchMap(async value => {
        const allUpdatedNodes = [];
        const node = this.graphService.getNodeSnapshot<T>(rootUri, nodeUri);
        if (!node) return;
        if (isEqual(this.getValue<T>(node as T, { attributeKey, innerPath }), value)) return;
        allUpdatedNodes.push(
          produce(node, (draft: T) => {
            this.setValue(draft, { attributeKey, innerPath }, value);
          })
        );
        if (
          this.isReference({
            definition,
            attributeKey: attributeKey as keyof JsonModel,
            nodeUri,
            rootUri,
          })
        ) {
          const references = await this.addReferencesInGraph(value, {
            definition,
            cvName,
            classId,
            rootUri,
          });
          allUpdatedNodes.push(...references);
        }

        this.graphService.update(rootUri, ...allUpdatedNodes);
      })
    );
    const nodeToForm$ = this.graphService.getNode<T>(rootUri, nodeUri).pipe(
      filter(node => node != null),
      tap(node =>
        this.patchControlValue(this.getValue<T>(node as T, { attributeKey, innerPath }), control, emitEventFromNodeToForm ?? false)
      )
    );

    return merge(formToNode$, nodeToForm$).pipe(finalize(() => control.reset(undefined, { emitEvent: false })));
  }

  updateFormArray<T>(
    values$: Observable<T[]>,
    formArray: UntypedFormArray,
    controlBuilder: (value: T) => AbstractControl = value => this.fb.control(value)
  ): Observable<void> {
    return values$.pipe(
      map(values => {
        if (formArray.length === values.length) {
          return;
        } else if (formArray.length > values.length) {
          const formValues = formArray.value as T[];
          const toRemove = formValues
            .map((value, index) => (values.includes(value) ? -1 : index))
            .filter(index => index >= 0)
            .sort((a, b) => b - a);
          toRemove.forEach(index => formArray.removeAt(index));
        } else {
          const formValues = formArray.value ?? ([] as T[]);
          const toAdd = values.map((value, index) => (formValues.includes(value) ? -1 : index)).filter(index => index >= 0);
          toAdd.forEach(index => formArray.insert(index, controlBuilder(values[index])));
        }
      })
    );
  }

  private isReference({
    definition,
    attributeKey,
    nodeUri,
    rootUri,
  }: Pick<LinkControlToNodeAttributeOptions, 'attributeKey' | 'definition' | 'nodeUri' | 'rootUri'>): boolean {
    const node = this.graphService.getNodeSnapshot(rootUri, nodeUri);
    return this.dataModelDefinitionHelper.isReference(definition, node['@type'], attributeKey);
  }

  private async addReferencesInGraph(
    value: Many<string>,
    { rootUri, definition, cvName, classId }: LinkReferenceOptions
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
      const model = this.jsonModelService.createNewJsonModel(actualClassId, definition);
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
      return (await provider.getConceptByUri(uri).toPromise())?.['@type'] ?? [];
    }

    throw new Error(`Could not find classId for option '${uri}'`);
  }

  private patchControlValue(value: unknown, control: AbstractControl, emitEvent: boolean): void {
    if (value === control.value) return;
    else if (control instanceof UntypedFormArray) {
      control.patchValue((value as unknown[]) ?? [], { emitEvent });
    } else if (control instanceof UntypedFormGroup) {
      control.patchValue((value as {}) ?? {}, { emitEvent });
    } else {
      control.patchValue(value, { emitEvent });
    }
  }

  private getValue<T extends JsonModel>(
    node: JsonModel,
    options: Pick<LinkControlToNodeAttributeOptions<T>, 'attributeKey' | 'innerPath'>
  ): unknown {
    const fullPath = [options.attributeKey, ...manyToArray(options.innerPath)].filter(notNil);
    return get(node, fullPath);
  }

  private setValue<T extends JsonModel>(
    node: JsonModel,
    options: Pick<LinkControlToNodeAttributeOptions<T>, 'attributeKey' | 'innerPath'>,
    value: unknown
  ): void {
    const fullPath = [options.attributeKey, ...manyToArray(options.innerPath)].filter(notNil);
    set(node, fullPath, value);
  }
}

export interface LinkReferenceOptions {
  rootUri: string;
  definition: unknown;
  cvName?: Many<string>;
  classId?: string;
}

export interface LinkControlToNodeAttributeOptions<T = JsonModel> {
  rootUri: string;
  nodeUri: string;
  attributeKey: keyof T;
  control: AbstractControl;
  definition: unknown;
  cvName?: Many<string>;
  classId?: string;
  // TODO handle this
  datatype?: string;
  innerPath?: Many<number | string>;
  emitEventFromNodeToForm?: boolean;
}
