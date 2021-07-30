import { Injectable } from '@angular/core';
import { from, fromEvent, Observable } from 'rxjs';
import { filter, map, scan, sequenceEqual, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class KonamiService {
  codeDetected$: Observable<boolean> = fromEvent<KeyboardEvent>(window, 'keyup').pipe(
    map(e => e.key),
    scan<string, string[]>((acc, key) => {
      acc = [...acc, key];
      if (acc.length > this.code.length) acc.shift();
      return acc;
    }, []),
    switchMap(keys => from(keys).pipe(sequenceEqual(from(this.code)))),
    filter(a => !!a),
    map(() => true)
  );

  private readonly code: string[] = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];
}
