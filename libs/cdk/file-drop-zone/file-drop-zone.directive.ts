import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { OnDestroy$ } from '@cognizone/ng-core';
import { BehaviorSubject, EMPTY, fromEvent, identity, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { FileDropZoneService } from './file-drop-zone.service';

interface FileDropZoneOptions {
  draggingDebounceTime?: number;
  draggingClass?: string;
}

export const defaultFileDropZoneOptions: FileDropZoneOptions = {
  draggingDebounceTime: 50,
  draggingClass: 'is-dragging',
};

export const FILE_DROP_ZONE_OPTIONS = new InjectionToken<FileDropZoneOptions>('FILE_DROP_ZONE_OPTIONS', {
  factory: () => defaultFileDropZoneOptions,
});

@Directive({
  selector: '[czFileDropZone]',
  standalone: true,
})
export class FileDropZoneDirective extends OnDestroy$ implements OnDestroy, OnInit, FileDropZoneOptions {
  private options = inject(FILE_DROP_ZONE_OPTIONS);
  @Input('czFileDropZoneDisabled')
  set disabled(value: boolean) {
    if (this.disabled$.value !== value) this.disabled$.next(value);
  }
  @Input()
  draggingClass = this.options.draggingClass;
  @Input()
  draggingDebounceTime = this.options.draggingDebounceTime;
  @Output()
  filesDropped: EventEmitter<File[]> = new EventEmitter<File[]>();
  @Output()
  dragging: EventEmitter<boolean> = new EventEmitter<boolean>();

  private fileDropZoneService: FileDropZoneService = inject(FileDropZoneService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private ngZone: NgZone = inject(NgZone);
  private elRef: ElementRef<HTMLElement> = inject(ElementRef);
  private disabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.subSink = this.disabled$.subscribe(disabled => {
      if (!disabled) {
        this.fileDropZoneService.registerDropZone(this);
      } else {
        this.fileDropZoneService.unregisterDropZone(this);
      }
    });
    this.initDragging();
    this.initDropping();
  }

  ngOnDestroy(): void {
    this.fileDropZoneService.unregisterDropZone(this);
  }

  private initDragging(): void {
    const start$ = merge(fromEvent(this.elRef.nativeElement, 'dragenter'), fromEvent(this.elRef.nativeElement, 'dragover')).pipe(
      map(() => true)
    );
    const end$ = merge(fromEvent(this.elRef.nativeElement, 'dragend'), fromEvent(this.elRef.nativeElement, 'dragleave')).pipe(
      map(() => false)
    );

    this.ngZone.runOutsideAngular(() => {
      this.subSink = this.disabled$
        .pipe(
          switchMap(disabled => (disabled ? EMPTY : merge(start$, end$))),
          distinctUntilChanged(),
          this.draggingDebounceTime ? debounceTime(this.draggingDebounceTime) : identity
        )
        .subscribe(isDragging => {
          this.ngZone.run(() => {
            this.setDragging(isDragging);
          });
        });
    });
  }

  private initDropping(): void {
    this.subSink = this.disabled$
      .pipe(
        switchMap(disabled => (disabled ? EMPTY : fromEvent<DragEvent>(this.elRef.nativeElement, 'drop'))),
        map(event => {
          event.preventDefault();
          return event.dataTransfer?.files;
        })
      )
      .subscribe(files => {
        this.filesDropped.emit(files ? Array.from(files) : []);
        this.setDragging(false);
      });
  }

  private setDragging(isDragging: boolean): void {
    if (this.draggingClass) {
      this.elRef.nativeElement.classList.toggle(this.draggingClass, isDragging);
    }
    this.dragging.emit(isDragging);
    this.cdr.markForCheck();
  }
}
