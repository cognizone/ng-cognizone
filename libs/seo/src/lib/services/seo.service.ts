import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Many, manyToArray, Nil } from '@cognizone/model-utils';
import produce from 'immer';
import { BehaviorSubject, Observable } from 'rxjs';

import { composeProcessors, MetaDescriptor, MetaId, MetaIds, MetaValue, MetaValueLike, SEO_OPTIONS, SeoOptions, SeoState } from '../models';
import { createPrefix } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  state$: Observable<SeoState>;
  private meta = inject(Meta);
  private title = inject(Title);
  private document = inject(DOCUMENT);
  private options = inject(SEO_OPTIONS);
  private defaultState: SeoState = {
    metaValues: {
      [MetaIds.HTML_PREFIX]: [{ id: 'og-prefix', value: createPrefix('og', 'https://ogp.me/ns#') }],
    },
  };
  private _state$: BehaviorSubject<SeoState>;
  private count = 0;

  constructor() {
    this._state$ = new BehaviorSubject<SeoState>(this.defaultState);
    this.state$ = this._state$.asObservable();
  }

  reset(): void {
    this.setState(this.defaultState);
    this.syncStateWithTags();
  }

  resetMeta(metaId: MetaId): void {
    const newState = produce(this.getState(), draft => {
      draft.metaValues ??= {};
      draft.metaValues[metaId] = this.defaultState.metaValues?.[metaId] ?? [];
    });
    this.setState(newState);
    this.syncTagsWithState(metaId);
  }

  getDescriptor(metaId: MetaId): MetaDescriptor {
    const descriptor = this.options.metaDescriptors?.[metaId];
    if (!descriptor) throw new Error(`No meta descriptor found for id ${String(metaId)}`);
    return descriptor;
  }

  getOptions(): SeoOptions {
    return this.options;
  }

  setOptions(options: SeoOptions): void {
    this.options = options;
  }

  syncStateWithTags(): void {
    Object.keys(this.options.metaDescriptors ?? {}).forEach(id => this.syncTagsWithState(id));
  }

  setCanonicalUrl(canonicalUrl: Nil<string>, options?: SetMetaValueOptions): MetaValueCmd {
    canonicalUrl = canonicalUrl?.trim();
    return canonicalUrl
      ? this.setMetaValue(MetaIds.CANONICAL_URL_LINK, canonicalUrl, options)
      : this.removeMeta(MetaIds.CANONICAL_URL_LINK, options);
  }

  setTitle(title: Many<MetaValueLike>, options?: SetMetaValueOptions): MetaValueCmd {
    return this.setMetaValue(MetaIds.TITLE_TAG, title, options);
  }

  addPrefix(shortened: string, full: string): MetaValueCmd {
    return this.appendMetaValue(MetaIds.HTML_PREFIX, createPrefix(shortened, full));
  }

  setMetaValue(metaId: MetaId, value: Many<MetaValueLike>, options?: SetMetaValueOptions): MetaValueCmd {
    const descriptor = this.getDescriptor(metaId);
    const valueArr = this.toMetaValues(metaId, value);
    if (valueArr.length > 1 && !descriptor.multi) {
      throw new Error(`Cannot set multiple values for non multi meta descriptor ${String(metaId)}`);
    }

    const setValue = (draft: SeoState) => {
      draft.metaValues = draft.metaValues ?? {};
      if (valueArr.length) draft.metaValues[metaId] = valueArr;
      else delete draft.metaValues[metaId];
    };

    this.setState(produce(this.getState(), setValue));

    if (options?.setAsDefault) {
      this.defaultState = produce(this.defaultState, setValue);
    }

    if (!options?.skipStateSync) this.syncTagsWithState(metaId);
    const cmd = this.getMetaValueCmd(metaId, valueArr);
    if (options?.skipLinkedKeys) return cmd;

    const linkedKeys = Object.values(this.options.linkedKeys ?? {}).reduce((acc, curr) => {
      if (!curr.includes(metaId)) return acc;
      curr.forEach(key => {
        if (key === metaId || acc.includes(key)) return;
        acc.push(key);
      });
      return acc;
    }, [] as string[]);

    linkedKeys.forEach(key => this.setMetaValue(key, valueArr, { ...options, skipLinkedKeys: true }));

    return cmd;
  }

  appendMetaValue(metaId: MetaId, value: Many<MetaValueLike>, options?: SetMetaValueOptions): MetaValueCmd {
    const { multi } = this.getDescriptor(metaId);
    if (!multi) throw new Error(`Cannot append to non multi meta descriptor ${String(metaId)}`);

    const prev = this.getState().metaValues?.[metaId] ?? [];
    const valueArr = this.toMetaValues(metaId, value);
    const next = [...prev, ...valueArr];

    this.setMetaValue(metaId, next, options);
    return this.getMetaValueCmd(metaId, valueArr);
  }

  removeMetaValue(metaId: string, value: Many<Pick<MetaValue, 'id'> | string>, options?: SetMetaValueOptions): void {
    const curr = this.getState().metaValues?.[metaId];
    if (!curr) return;

    const valueArr = manyToArray(value);
    const next = curr.filter(v => valueArr.every(v2 => (typeof v2 === 'string' ? v.value !== v2 : v.id !== v2.id)));
    if (next.length === curr.length) return;

    this.setMetaValue(metaId, next, options);
  }

  removeMeta(metaId: MetaId, options?: SetMetaValueOptions): MetaValueCmd {
    return this.setMetaValue(metaId, [], options);
  }

  getMetaValue(metaId: MetaId): MetaValue[] | undefined {
    return this.getState().metaValues?.[metaId];
  }

  private getMetaValueCmd(metaId: MetaId, values: MetaValue[]): MetaValueCmd {
    let currentValues = values;
    return {
      remove: () => {
        const curr = this.getState().metaValues?.[metaId];
        if (!curr) return;
        const next = curr.filter(v => !currentValues.includes(v));
        this.setMetaValue(metaId, next);
        currentValues = [];
      },
      update: newRawValues => {
        const newValues = this.toMetaValues(metaId, newRawValues);
        const curr = this.getState().metaValues?.[metaId] ?? [];
        const next = curr.filter(v => !currentValues.includes(v));
        next.push(...newValues);
        this.setMetaValue(metaId, next);
        currentValues = newValues;
      },
    };
  }

  private syncTagsWithState(metaId: MetaId): void {
    const descriptor = this.getDescriptor(metaId);
    const state = this.getState();
    const preProcessor = composeProcessors(descriptor.preProcessors);

    const selector = this.getSelector(descriptor);
    if (selector) {
      while (this.meta.getTag(selector)) this.meta.removeTag(selector);
    }

    const isEmpty = !state.metaValues?.[metaId]?.length;
    if (isEmpty) {
      this.handleMetaValue('', descriptor);
    }

    if (descriptor.multiTags) {
      state.metaValues?.[metaId]
        ?.map(v => v.value)
        .map(preProcessor)
        .forEach(v => this.handleMetaValue(v, descriptor));
    } else {
      const value = state.metaValues?.[metaId]
        ?.map(v => v.value)
        .map(preProcessor)
        .join(descriptor.separator);
      if (value) this.handleMetaValue(value, descriptor);
    }
  }

  private handleMetaValue(value: string, descriptor: MetaDescriptor): void {
    const postProcessor = composeProcessors(descriptor.postProcessors);
    value = postProcessor(value, 0, [value]);

    if (value && descriptor.keyAttribute && typeof descriptor.id === 'string') {
      this.meta.addTag({
        [descriptor.keyAttribute]: descriptor.id,
        content: value,
      });
    } else {
      switch (descriptor.id) {
        case MetaIds.TITLE_TAG: {
          this.title.setTitle(value);
          break;
        }
        case MetaIds.CANONICAL_URL_LINK: {
          this.handleCanonicalUrl(value);
          break;
        }
        case MetaIds.HTML_PREFIX: {
          this.handlePrefix(value);
          break;
        }
        default:
          if (value) {
            throw new Error(`Unsupported meta descriptor ${String(descriptor.id)}`);
          }
      }
    }
  }

  private handleCanonicalUrl(value: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!value) {
      link?.remove();
      return;
    }

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', value);
  }

  private handlePrefix(value: string): void {
    this.document.querySelector('html')?.setAttribute('prefix', value);
  }

  private getSelector(descriptor: MetaDescriptor): string | undefined {
    return typeof descriptor.id === 'string' ? `${descriptor.keyAttribute}='${descriptor.id}'` : undefined;
  }

  private toMetaValues(metaId: MetaId, values: Many<MetaValueLike>): MetaValue[] {
    return manyToArray(values)
      .map(value => {
        if (typeof value === 'string') {
          return {
            id: this.generateValueId(metaId),
            value,
          };
        }
        if (!value.id) value = { ...value, id: this.generateValueId(metaId) };
        return value as MetaValue;
      })
      .sort(this.metaValuesSorter);
  }

  private metaValuesSorter = (a: MetaValue, b: MetaValue) => {
    if (a.index == null && b.index == null) return 0;
    if (a.index == null) return 1;
    if (b.index == null) return -1;
    return a.index - b.index;
  };

  private generateValueId(metaId: MetaId): string {
    return `${String(metaId)}-value-${this.count++}`;
  }

  private getState(): SeoState {
    return this._state$.value;
  }

  private setState(state: SeoState): void {
    return this._state$.next(state);
  }
}

export interface SetMetaValueOptions {
  setAsDefault?: boolean;
  skipLinkedKeys?: boolean;
  skipStateSync?: boolean;
}

export interface MetaValueCmd {
  remove: Function;
  update: (newValues: Many<MetaValueLike>) => void;
}
