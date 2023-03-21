import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyOptionModule as MatOptionModule } from '@angular/material/legacy-core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
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
