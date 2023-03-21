import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { OnDestroy$ } from '@cognizone/ng-core';

/**
 * `ListPaginatorComponent` a paginator enables iterating over an entire result set.
 */
@Component({
  selector: 'cz-list-paginator',
  templateUrl: './list-paginator.component.html',
  styleUrls: ['./list-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPaginatorComponent extends OnDestroy$ implements OnInit, OnChanges {
  @Input()
  pagination!: Pagination;
  @Input()
  total!: number;

  @Output()
  changePagination: EventEmitter<Pagination> = new EventEmitter();

  /**
   *  Property determines how many items should be displayed per page
   */
  sizes: number[] = [10, 25, 50, 100];
  sizeControl: UntypedFormControl = this.fb.control(null);

  constructor(private fb: UntypedFormBuilder) {
    super();
  }

  /**
   *  @ignore
   */
  ngOnInit(): void {
    this.sizeControl.valueChanges.pipe(this.untilDestroyed()).subscribe(size => this.changePagination.emit({ ...this.pagination, size }));
  }

  /**
   *  @ignore
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pagination) {
      this.sizeControl.setValue(this.pagination.size, { emitEvent: false });
    }
  }

  get activePage(): number {
    return Math.floor(this.pagination.from / this.pagination.size);
  }

  set activePage(value: number) {
    this.changePagination.emit({ ...this.pagination, from: value * this.pagination.size });
  }

  /**
   *  @ignore
   */
  get lastPage(): number {
    // elastic has a 10.000 limitation for pagination
    const total = Math.min(10_000, this.total);
    const lastPage = Math.ceil(total / this.pagination.size) - 1;
    return Math.max(0, lastPage);
  }

  /**
   *  `pages` calculates and returns the list of pages
   */
  get pages(): number[] {
    const numberOfPages = 7;
    const activePage = this.activePage;
    const lastPage = this.lastPage;
    const pages: number[] = [activePage];

    for (let i = 1; i < numberOfPages && pages.length < numberOfPages; ++i) {
      if (activePage - i >= 0) pages.unshift(activePage - i);
      if (pages.length === numberOfPages) break;
      if (activePage + i <= lastPage) pages.push(activePage + i);
    }

    return pages;
  }
}

export interface Pagination {
  from: number;
  size: number;
}
