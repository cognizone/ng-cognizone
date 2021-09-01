import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-link',
  templateUrl: './code-link.component.html',
  styleUrls: ['./code-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeLinkComponent {
  @Input()
  path!: string;

  @Input()
  showPreview = true;

  get previewUrl(): string {
    return `assets/src/${this.path}`;
  }

  get sourceUrl(): string {
    return `https://bitbucket.org/cognizone/ng-cognizone/src/master/projects/docs-app/src/${this.path}`;
  }
}
