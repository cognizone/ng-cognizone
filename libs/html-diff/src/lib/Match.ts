/* eslint-disable */
export class Match {
  constructor(public startInOld: number, public startInNew: number, public size: number) {}

  get endInOld(): number {
    return this.startInOld + this.size;
  }

  get endInNew(): number {
    return this.startInNew + this.size;
  }
}
