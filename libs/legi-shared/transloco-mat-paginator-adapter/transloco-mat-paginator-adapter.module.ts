import { NgModule } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

import { TranslocoMatPaginatorIntl } from './transloco-mat-paginator-intl.service';

@NgModule({
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: TranslocoMatPaginatorIntl,
    },
  ],
})
export class TranslocoMatPaginatorAdapterModule {}
