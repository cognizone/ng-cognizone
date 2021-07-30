import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-api-table',
  templateUrl: './api-table.component.html',
  styleUrls: ['./api-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiTableComponent {
  @Input()
  apis!: ApiDescription[];

  displayedColumns: string[] = ['name', 'description'];
}

export interface ApiDescription {
  name: string;
  description: string;
}
