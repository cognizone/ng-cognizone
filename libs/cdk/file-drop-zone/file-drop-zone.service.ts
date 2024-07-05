import { Injectable, NgZone, inject } from '@angular/core';
import { SubSink, notNil } from '@cognizone/model-utils';
import { fromEvent, merge } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileDropZoneService {
  private ngZone: NgZone = inject(NgZone);
  private subSink: SubSink = new SubSink();
  private registered: Set<unknown> = new Set();

  registerDropZone(obj: unknown): void {
    if (this.registered.size === 0) {
      this.preventDefaultDragAndDrop();
    }
    this.registered.add(obj);
  }

  unregisterDropZone(obj: unknown): void {
    this.registered.delete(obj);
    if (this.registered.size === 0) {
      this.subSink.empty();
    }
  }

  // without this, the browser tries to open the file in the current tab
  private preventDefaultDragAndDrop(): void {
    this.ngZone.runOutsideAngular(() => {
      const dragover$ = fromEvent(window, 'dragover');
      const drop$ = fromEvent(window, 'drop');
      this.subSink.add = merge(drop$, dragover$)
        .pipe(filter(notNil))
        .subscribe(event => {
          event.preventDefault();
        });
    });
  }
}
