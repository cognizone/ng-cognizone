import { Injectable } from '@angular/core';
import { downloadBlob } from '@cognizone/model-utils';
import { BehaviorSubject, Observable } from 'rxjs';

import { ElasticInstance } from '../models/elastic-instance';

@Injectable({
  providedIn: 'root'
})
export class ElasticInstanceService {
  private defaultValues: ElasticInstance[] = [
    { url: 'http://ch-casemates-dev-elastic.cz-aws.net:9200', label: 'ch casemates dev' },
    { url: 'http://ch-legipro-dev-elastic.cz-aws.net:9200', label: 'ch legipro dev' }
  ];
  private readonly LOCAL_STORAGE_KEY: string = 'cz elastic urls';
  private _values$: BehaviorSubject<ElasticInstance[]>;

  constructor() {
    this._values$ = new BehaviorSubject<ElasticInstance[]>([]);
    this._values$.next(this.values);
  }

  private get values(): ElasticInstance[] {
    const localValues = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (!localValues) {
      this.values = this.defaultValues;
      return this.values;
    }
    const raw = JSON.parse(localValues) as (ElasticInstance | string)[];
    return raw.map(r => (typeof r === 'string' ? { url: r, label: r } : r)).sort((a, b) => a.label.localeCompare(b.label));
  }

  private set values(v: ElasticInstance[]) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(v));
    this._values$.next(v);
  }

  edit(oldInstance: ElasticInstance, newInstance: ElasticInstance): void {
    this.deleteValue(oldInstance);
    this.addIfNotPresent(newInstance);
  }

  readFile(file: Blob): void {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.result) this.values = JSON.parse(fileReader.result.toString());
    };
    fileReader.readAsText(file);
  }

  addIfNotPresent(instance: ElasticInstance): void {
    instance = this.cleanUp(instance);
    const current = this._values$.value;
    if (current.find(v => v.url === instance.url)) return;
    this.values = [...current, instance];
  }

  get values$(): Observable<ElasticInstance[]> {
    return this._values$.asObservable();
  }

  deleteValue(instance: ElasticInstance): void {
    this.values = this.values.filter(items => items.url !== instance.url);
  }
  downloadFile(): void {
    downloadBlob(new Blob([JSON.stringify(this.values)], { type: 'application/json' }));
  }

  private cleanUp(instance: ElasticInstance): ElasticInstance {
    const url = instance.url.trim().replace(/\/$/, '');
    const label = instance.label?.trim() || url;
    return {
      url,
      label
    };
  }
}