import { Directive } from '@angular/core';
import { MAT_LEGACY_FORM_FIELD_DEFAULT_OPTIONS as MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/legacy-form-field';

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
