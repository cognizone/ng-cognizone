import { Injectable } from '@angular/core';
import { Nil, notNil } from '@cognizone/model-utils';
import { get, uniqWith, isEqual } from 'lodash-es';
import { ElasticState, ElasticPropertyType } from '../models/elastic-state';

@Injectable({
  providedIn: 'root',
})
export class ElasticStateUtils {
  getPropertyType(state: ElasticState, index: Nil<string>, path: string): ElasticPropertyType | undefined {
    const indices: string[] = [];
    if (index) {
      indices.push(index);
    } else {
      indices.push(...Object.keys(state?.metadata?.indices ?? {}));
    }
    const typeProperties = indices.map(ind => this.getIndexPropertyType(state, ind, path)).filter(notNil);

    const uniques = uniqWith(typeProperties, isEqual);

    if (uniques.length === 1) return uniques[0];
    return undefined;
  }

  private getIndexPropertyType(state: ElasticState, index: string, path: string): ElasticPropertyType | undefined {
    const subPath = path
      .split('.')
      .map((value, i, arr) => (i < arr.length - 1 ? `${value}.properties` : value))
      .join('.');
    return get(state, `metadata.indices.${index}.mappings._doc.properties.${subPath}`);
  }
}
