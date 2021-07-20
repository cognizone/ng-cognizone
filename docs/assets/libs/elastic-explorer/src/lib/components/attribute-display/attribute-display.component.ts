import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isJsonModel } from '@cognizone/ng-application-profile';

// tslint:disable: no-any
@Component({
  selector: 'app-attribute-display',
  templateUrl: './attribute-display.component.html',
  styleUrls: ['./attribute-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributeDisplayComponent implements OnChanges {
  @Input()
  model!: any;
  @Input()
  modelHit!: any;
  @Input()
  key?: string | number;
  @Input()
  padded: boolean = false;
  @Input()
  opened: boolean = false;
  value: any;
  type!: 'string' | 'JsonModel' | 'Date' | 'Array' | 'number' | 'uri' | 'boolean';
  subKeys: string[] = [];

  constructor(private snackBar: MatSnackBar) {}

  ngOnChanges(): void {
    this.value = this.key && this.model ? this.model[this.key] : this.model;
    if (this.value instanceof Date) {
      this.type = 'Date';
    } else if (Array.isArray(this.value)) {
      this.type = 'Array';
      this.value = [...this.value].sort((a, b) => {
        if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b);
        else if (isJsonModel(a) && isJsonModel(b)) return a['@id'].localeCompare(b['@id'], undefined, { numeric: true });
        return 0;
      });
    } else if (typeof this.value === 'number') {
      this.type = 'number';
    } else if (typeof this.value === 'boolean') {
      this.type = 'boolean';
    } else if (typeof this.value === 'string' && this.value.match(/^http(s)?\:\/\//)) {
      this.type = 'uri';
    } else if (isJsonModel(this.value) || typeof this.value === 'object') {
      this.type = 'JsonModel';
      this.subKeys = Object.keys(this.value)
        .filter(k => !k.startsWith('@'))
        .sort();
    } else {
      this.type = 'string';
    }
  }

  openSnackbar(message: string): void {
    this.snackBar.open(message, 'dismiss', {
      duration: 3000
    });
  }
}
