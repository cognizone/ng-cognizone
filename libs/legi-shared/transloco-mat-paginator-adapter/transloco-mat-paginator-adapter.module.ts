import { NgModule } from '@angular/core';
import { MatLegacyPaginatorIntl as MatPaginatorIntl } from '@angular/material/legacy-paginator';

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
