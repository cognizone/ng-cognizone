import { Directive } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@Directive({
  selector: '[czPaginatorOutline]',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'none',
      },
    },
  ],
})
export class PaginatorOutlineDirective {}
