import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { HighlightService } from '@app/core/services/highlight.service';
import { OnDestroy$ } from '@cognizone/ng-core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockComponent extends OnDestroy$ {
  @Input()
  language?: string;

  @Input()
  prefix = '';

  @Input()
  range?: [number, number];

  @Input()
  set url(url: string) {
    if (!url) return;
    this.http
      .get(url, { responseType: 'text' })
      .pipe(
        map(code => {
          if (this.range) {
            const [min, max] = this.range;
            code = code.split('\n').slice(min, max).join('\n');
          }
          if (this.prefix) code = `${this.prefix}\n${code}`;
          const language = this.language ? this.language : url.split('.').pop();
          return this.highlightService.highlight(code, language);
        }),
        this.untilDestroyed()
      )
      .subscribe(codeHtml => {
        this.codeHtml = codeHtml;
        this.cdr.markForCheck();
      });
  }

  @Input()
  set code(code: string) {
    if (!code) return;
    const lines = code.split('\n');
    // clean empty first lines
    while (lines.length > 0 && lines[0].trim() === '') lines.shift();

    // remove useless indentation
    const minSpaces = lines
      .filter(line => line.trim())
      .reduce((spaces, line) => {
        let i = 0;
        for (i = 0; i < line.length && line[i] === ' '; ++i);
        return Math.min(spaces, i);
      }, Number.MAX_SAFE_INTEGER);
    code = lines.map(line => line.slice(minSpaces)).join('\n');

    const language = this.language ? this.language : 'ts';
    this.codeHtml = this.highlightService.highlight(code, language);
  }

  codeHtml = '';

  constructor(private highlightService: HighlightService, private http: HttpClient, private cdr: ChangeDetectorRef) {
    super();
  }
}
