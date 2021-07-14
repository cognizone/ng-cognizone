import { Cv } from '../models/cv';

export class SetCv {
  static readonly type: string = '[Legi-Cv] set cv';

  constructor(public payload: { cvName: string; uri: string; cv: Cv }) {}
}
