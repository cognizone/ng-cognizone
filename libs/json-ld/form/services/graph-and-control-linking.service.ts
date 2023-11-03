import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { dateToDateString } from '@cognizone/model-utils';
import produce from 'immer';
import { get, isEqual, set } from 'lodash-es';
import { merge, Observable } from 'rxjs';
import { filter, finalize, map, tap } from 'rxjs/operators';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries -- needed for sub entries in lib
import { JsonLdNode, JsonLdNodeFlat } from '@cognizone/json-ld/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries -- needed for sub entries in lib
import { JsonLdStoreService } from '@cognizone/json-ld/store';

@Injectable({ providedIn: 'root' })
export class GraphAndControlLinkingService {
  constructor(private jsonLdStoreService: JsonLdStoreService) {}

  /**
   * @description at first, the form is updated without emitEvent: false to ensure that local logic in the component is
   * triggered by the first time the node values are applied
   */
  linkControlToNodeAttribute<T extends JsonLdNode>(options: LinkControlToNodeAttributeOptions): Observable<unknown> {
    const { graphUri: rootUri, nodeUri, control } = options;
    const currentNode = this.jsonLdStoreService.getNodeSnapshot<T>(rootUri, nodeUri);

    const val = this.getNodeValue<T>(currentNode, options);
    this.patchControlValue(val, options);

    const formToNode$ = control.valueChanges.pipe(
      map(value => (options.formValueToNodeValue ? options.formValueToNodeValue(value) : value)),
      tap(value => {
        const node = this.jsonLdStoreService.getNodeSnapshot<T>(rootUri, nodeUri);
        if (!node) return;
        if (isEqual(this.getNodeValue<T>(node, options), value)) return;

        const updatedNode = produce(node, (draft: JsonLdNodeFlat<T>) => {
          this.setValue(draft, options, value);
        });

        if (updatedNode !== node) {
          this.jsonLdStoreService.update(rootUri, updatedNode as JsonLdNode);
        }
      })
    );
    const nodeToForm$ = this.jsonLdStoreService.getNode<T>(rootUri, nodeUri).pipe(
      filter(node => node != null),
      tap(node => this.patchControlValue(this.getNodeValue<T>(node, options), options))
    );

    return merge(formToNode$, nodeToForm$).pipe(finalize(() => control.reset(undefined, { emitEvent: false })));
  }

  private patchControlValue(
    value: unknown,
    { control, emitEventFromNodeToForm, nodeValueToFormValue }: LinkControlToNodeAttributeOptions
  ): void {
    value = nodeValueToFormValue ? nodeValueToFormValue(value) : value;
    if (isEqual(value, control.value)) return;
    if (control instanceof UntypedFormArray) {
      value ??= [];
    } else if (control instanceof UntypedFormGroup) {
      value ??= {};
    }
    control.patchValue(value, { emitEvent: emitEventFromNodeToForm });
  }

  private getNodeValue<T extends JsonLdNode>(node: JsonLdNodeFlat<T>, options: LinkControlToNodeAttributeOptions): unknown {
    return get(node, options.path);
  }

  private setValue<T extends JsonLdNode>(node: JsonLdNodeFlat<T>, options: LinkControlToNodeAttributeOptions, value: unknown): void {
    if (value instanceof Date) {
      value = dateToDateString(value);
    }

    if (isEqual(this.getNodeValue(node, options), value)) return;
    set(node, options.path, value);
  }
}

export interface LinkControlToNodeAttributeOptions<T = unknown, U = T> {
  graphUri: string;
  nodeUri: string;
  path: string[];
  control: AbstractControl;
  emitEventFromNodeToForm?: boolean;
  nodeValueToFormValue?: (node: T) => U;
  formValueToNodeValue?: (value: U) => T;
}
