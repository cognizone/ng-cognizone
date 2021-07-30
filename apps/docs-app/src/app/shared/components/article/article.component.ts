import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  textContent?: string;

  constructor(private readonly elRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.textContent = this.elRef.nativeElement.textContent ?? '';
  }
}
