import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { I18nService } from '@cognizone/i18n';

/**
 * `TranslocoMatPaginatorIntl` is a helper class, that's only purpose is to provide
 *   needed translations for mat-paginator labels, using {@link I18nService}.
 */
@Injectable()
export class TranslocoMatPaginatorIntl extends MatPaginatorIntl {
  constructor(private i18nService: I18nService) {
    super();
    this.i18nService.selectActiveLang().subscribe(() => {
      this.adaptLabels();
      this.changes.next();
    });
  }

  getRangeLabel: MatPaginatorIntl['getRangeLabel'] = (page, pageSize, length) => {
    if (length === 0 || pageSize === 0) {
      return this.i18nService.translate('global.table.range', { from: '0', to: `${length}` });
    }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    const from = `${startIndex + 1} – ${endIndex}`;
    const to = `${length}`;
    return this.i18nService.translate('global.table.range', { from, to });
  };

  private adaptLabels(): void {
    this.firstPageLabel = this.i18nService.translate('global.table.first_page');
    this.itemsPerPageLabel = this.i18nService.translate('global.table.items_per_page');
    this.lastPageLabel = this.i18nService.translate('global.table.last_page');
    this.nextPageLabel = this.i18nService.translate('global.table.next_page');
    this.previousPageLabel = this.i18nService.translate('global.table.previous_page');
  }
}
