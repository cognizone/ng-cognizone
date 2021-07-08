import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export function startWithTap<T>(callback: () => void): (source: Observable<T>) => Observable<T> {
  return source =>
    of({}).pipe(
      tap(callback),
      switchMap(() => source)
    );
}
