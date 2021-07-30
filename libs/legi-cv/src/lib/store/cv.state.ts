import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';

import { Cv, CvDictionary } from '../models/cv';

import { SetCv } from './cv.actions';

export interface LegiCvStateModel {
  [cvName: string]: { uri: string; values: CvDictionary };
}

export const LEGI_CV_STATE_TOKEN = new StateToken<LegiCvStateModel>('legi_cv');

@State({
  name: LEGI_CV_STATE_TOKEN,
  defaults: {},
})
@Injectable()
export class LegiCvState {
  @Action(SetCv)
  setCv(ctx: StateContext<LegiCvStateModel>, { payload: { cv, cvName, uri } }: SetCv): void {
    const values = this.toDictionary(cv);
    ctx.patchState({ [cvName]: { uri, values } });
  }

  private toDictionary(cv: Cv): CvDictionary {
    if (!Array.isArray(cv)) return cv;
    const dic: CvDictionary = {};
    cv.forEach(concept => (dic[concept['@id']] = concept));
    return dic;
  }
}
