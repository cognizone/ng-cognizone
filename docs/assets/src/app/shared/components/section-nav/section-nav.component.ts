import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Page } from '@app/core';

@Component({
  selector: 'app-section-nav',
  templateUrl: './section-nav.component.html',
  styleUrls: ['./section-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionNavComponent {
  @Input()
  set pages(pages: Page[]) {
    this._pages = (pages ?? []).map(page => ({ ...page, opened: true }));
  }

  _pages!: ExtendedPage[];

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}

interface ExtendedPage extends Page {
  opened: boolean;
}
