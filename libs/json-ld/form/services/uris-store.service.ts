import { Injectable, Optional, SkipSelf } from '@angular/core';

@Injectable()
export class UrisStoreService {
  get graphUri(): string {
    return this._graphUri ?? this.parent?.graphUri;
  }

  set graphUri(uri: string) {
    this._graphUri = uri;
  }

  nodeUri!: string;
  private _graphUri!: string;

  constructor(
    @Optional()
    @SkipSelf()
    private parent?: UrisStoreService
  ) {}
}
