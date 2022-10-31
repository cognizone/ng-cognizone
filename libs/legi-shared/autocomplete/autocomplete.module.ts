import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { I18nModule } from '@cognizone/i18n';
import { SelectOptionSortModule } from '@cognizone/legi-shared/select-option-sort';
import { ErrorModule } from '@cognizone/legi-shared/error';

import { AutocompleteMultiComponent } from './autocomplete-multi/autocomplete-multi.component';
import { AutocompleteSingleComponent } from './autocomplete-single/autocomplete-single.component';
import { AutocompleteComponent } from './autocomplete.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    // Material
    MatAutocompleteModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatTooltipModule,
    // Cognizone
    I18nModule,
    SelectOptionSortModule,
    ErrorModule,
  ],
  declarations: [AutocompleteComponent, AutocompleteSingleComponent, AutocompleteMultiComponent],
  exports: [AutocompleteComponent, AutocompleteMultiComponent, AutocompleteSingleComponent],
})
export class AutocompleteModule {}
