import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { selectProp } from '@cognizone/model-utils';
import { isInstanceOf } from '@cognizone/ng-core';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, map, startWith, withLatestFrom } from 'rxjs/operators';

import { KonamiService, LibrariesService } from './core';
import { Page } from './core/models/page';
import { CoreStateFacade } from './core/store/core.facade';
import { CoreStateModel } from './core/store/core.state';
import { AnchorService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  core$: Observable<CoreStateModel> = this.coreStateFacade.core$;

  pages$: Observable<Page[]> = this.core$.pipe(selectProp('pages'), debounceTime(0));

  pagination$: Observable<{ previous?: Page; current?: Page; next?: Page }> = this.router.events.pipe(
    isInstanceOf(NavigationEnd),
    startWith({ url: this.route.snapshot.url.map(u => u.path).join('/') }),
    map(e => e.url),
    withLatestFrom(this.pages$.pipe(map(pages => this.getAllPages(pages)))),
    map(([url, pages]) => {
      url = url.split('?')[0];
      const index = pages.findIndex(page => url.endsWith(page.path));
      return index === -1 ? {} : { previous: pages[index - 1], current: pages[index], next: pages[index + 1] };
    })
  );

  easterPaused = false;

  easter$: Observable<SafeHtml> = this.konamiService.codeDetected$.pipe(
    map(() => atob(base64)),
    map(html => this.sanitizer.bypassSecurityTrustHtml(html))
  );

  isMediumScreen$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .pipe(map(match => match.matches));

  isLargeScreen$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.XLarge])
    .pipe(map(match => match.matches));

  startSidenavMode$: Observable<string> = this.isMediumScreen$.pipe(map(match => (match ? 'side' : 'over')));

  endSidenavOpened$: Observable<boolean> = combineLatest([this.isLargeScreen$, this.anchorService.anchors$]).pipe(
    map(([isLargeScreen, anchors]) => (isLargeScreen ? anchors.length > 0 : false)),
    debounceTime(100)
  );

  version$: Observable<string> = this.librariesService.getVersion('ng-core');

  title?: string;

  subtitle?: string;

  hasPages = false;

  constructor(
    private konamiService: KonamiService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private coreStateFacade: CoreStateFacade,
    private breakpointObserver: BreakpointObserver,
    private anchorService: AnchorService,
    private librariesService: LibrariesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initHasPages();
    this.core$.subscribe(({ pageTitle, pageSubtitle }) => {
      this.title = pageTitle;
      this.subtitle = pageSubtitle;
      const titleElement = document.getElementsByTagName('title').item(0) as HTMLTitleElement;
      let title = 'NgCognizone';
      if (pageTitle) {
        title += ` - ${pageTitle}`;
      }
      titleElement.innerText = title;
      this.cdr.markForCheck();
    });
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  private getAllPages(pages: Page[]): ConcretePage[] {
    return pages.reduce<ConcretePage[]>((acc, current) => {
      if (current.path) acc = [...acc, current as ConcretePage];
      if (current.pages) acc = this.getAllPages(current.pages);
      return acc;
    }, []);
  }

  private initHasPages(): void {
    this.pages$.pipe(debounceTime(0)).subscribe(pages => {
      this.hasPages = pages != null && pages.length > 0;
      this.cdr.markForCheck();
    });
  }
}

const base64 =
  'PGlmcmFtZQogICAgICAgIHdpZHRoPSI1NjAiCiAgICAgICAgaGVpZ2h0PSIzMTUiCiAgICAgICAgc3JjPSJodHRwczovL3d3dy55b3V0dWJlLW5vY29va2llLmNvbS9lbWJlZC9kUXc0dzlXZ1hjUT9jb250cm9scz0wJmF1dG9wbGF5PTEiCiAgICAgICAgZnJhbWVib3JkZXI9IjAiCiAgICAgICAgYWxsb3c9ImFjY2VsZXJvbWV0ZXI7IGF1dG9wbGF5OyBlbmNyeXB0ZWQtbWVkaWE7IGd5cm9zY29wZTsgcGljdHVyZS1pbi1waWN0dXJlIgogICAgICAgIGFsbG93ZnVsbHNjcmVlbgogICAgICA+PC9pZnJhbWU+';

type ConcretePage = Page & { path: string };
