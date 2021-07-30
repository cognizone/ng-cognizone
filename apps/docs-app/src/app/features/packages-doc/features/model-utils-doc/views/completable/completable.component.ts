import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreStateFacade } from '@app/core';

@Component({
  selector: 'app-completable',
  templateUrl: './completable.component.html',
  styleUrls: ['./completable.component.scss'],
})
export class CompletableComponent implements OnInit, OnDestroy {
  @ViewChild('docFrame')
  docFrame!: ElementRef<HTMLIFrameElement>;

  src?: SafeResourceUrl;

  constructor(
    private coreStateFacade: CoreStateFacade,
    private router: Router,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.coreStateFacade.setPageTitle('@cognizone/model-utils', 'Completable');
    const src = this.route.snapshot.queryParams.src ?? 'assets/docs/model-utils/index.html';
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(src);
  }

  ngOnDestroy(): void {
    this.coreStateFacade.resetPageTitle();
  }

  ngAfterViewInit(): void {
    const iframe = this.docFrame.nativeElement;
    iframe.onload = e => {
      iframe.width = iframe.contentWindow?.document.body.scrollWidth.toString() ?? '';
      iframe.height = iframe.contentWindow?.document.body.scrollHeight.toString() ?? '';
      this.router.navigate([], { queryParams: { src: iframe.contentWindow?.location.href } });
    };

    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
  }
}
