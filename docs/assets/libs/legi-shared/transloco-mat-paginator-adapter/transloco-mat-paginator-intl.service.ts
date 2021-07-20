import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class TranslocoMatPaginatorIntl extends MatPaginatorIntl {
  constructor(private transloco: TranslocoService) {
    super();
    this.adaptLabels();
    this.transloco.langChanges$.subscribe(() => {
      this.adaptLabels();
      this.changes.next();
    });
  }

  getRangeLabel: MatPaginatorIntl['getRangeLabel'] = (page, pageSize, length) => {
    if (length === 0 || pageSize === 0) {
      return this.transloco.translate('global.table.range', { from: '0', to: `${length}` });
    }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    const from = `${startIndex + 1} – ${endIndex}`;
    const to = `${length}`;
    return this.transloco.translate('global.table.range', { from, to });
  };

  private adaptLabels(): void {
    this.firstPageLabel = this.transloco.translate('global.table.first_page');
    this.itemsPerPageLabel = this.transloco.translate('global.table.items_per_page');
    this.lastPageLabel = this.transloco.translate('global.table.last_page');
    this.nextPageLabel = this.transloco.translate('global.table.next_page');
    this.previousPageLabel = this.transloco.translate('global.table.previous_page');
  }
}
