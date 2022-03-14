import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'cz-node-forms',
  templateUrl: './node-forms.component.html',
  styleUrls: ['./node-forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeFormsComponent {
  @Input()
  uris!: string[];
  @Input()
  expandFirst?: boolean;
  @Input()
  canBeRemoved: boolean = false;

  @Output()
  remove: EventEmitter<string> = new EventEmitter();
}
