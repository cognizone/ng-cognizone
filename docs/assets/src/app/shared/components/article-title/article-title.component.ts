import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ArticleComponent } from '../article/article.component';

@Component({
  selector: 'app-article-title',
  templateUrl: './article-title.component.html',
  styleUrls: ['./article-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleTitleComponent implements OnInit {
  @Input()
  lastUpdate?: Date;

  textContent!: string;

  constructor(private parent: ArticleComponent) {}

  ngOnInit(): void {
    this.textContent = this.parent.textContent ?? '';
  }
}
