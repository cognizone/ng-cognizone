import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { YASGUI } from '../models/yasgui';

@Injectable()
export class YasguiService {
  assetsBasePath = 'assets/ng-yasgui';

  private script?: HTMLScriptElement;

  private style?: HTMLLinkElement;

  private yasgui$?: Observable<YASGUI>;

  loadYasgui(): Observable<YASGUI> {
    if (this.yasgui$) return this.yasgui$;
    const head = document.getElementsByTagName('head').item(0);

    this.script = document.createElement('script');
    this.script.src = `${this.assetsBasePath}/yasgui.min.js`;
    head?.appendChild(this.script);

    this.style = document.createElement('link');
    this.style.href = `${this.assetsBasePath}/yasgui.min.css`;
    this.style.rel = 'stylesheet';
    head?.appendChild(this.style);

    return (this.yasgui$ = fromEvent(this.script, 'load').pipe(
      map(() => {
        this.clearYasguiCache();
        return ((window as unknown) as { YASGUI: YASGUI }).YASGUI;
      }),
      shareReplay(1)
    ));
  }

  unloadYasgui(): void {
    this.script?.remove();
    this.script = undefined;
    this.style?.remove();
    this.style = undefined;
    this.yasgui$ = undefined;
  }

  private clearYasguiCache(): void {
    for (let i = 0; i < localStorage.length; ++i) {
      const key = localStorage.key(i);
      if (key?.startsWith('yasgui')) {
        localStorage.removeItem(key);
      }
    }
  }
}
