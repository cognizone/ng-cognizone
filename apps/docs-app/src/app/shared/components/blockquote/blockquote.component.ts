import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blockquote',
  templateUrl: './blockquote.component.html',
  styleUrls: ['./blockquote.component.scss'],
  standalone: false,
})
export class BlockquoteComponent {
  @Input()
  from!: string;
}
