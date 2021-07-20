import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { CvDictionary } from '../models/cv';
import { SetCv } from '../store/cv.actions';
import { LEGI_CV_STATE_TOKEN } from '../store/cv.state';

@Injectable()
export class CvStateService {
  constructor(private store: Store) {}

  setCv(options: SetCv['payload']): void {
    this.store.dispatch(new SetCv(options));
  }

  getCv(cvName: string): Observable<CvDictionary> {
    return this.store.select(LEGI_CV_STATE_TOKEN).pipe(
      map(state => state[cvName]?.values),
      distinctUntilChanged()
    );
  }
}
