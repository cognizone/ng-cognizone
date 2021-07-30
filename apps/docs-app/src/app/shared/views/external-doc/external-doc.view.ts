import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreStateFacade } from '@app/core';

@Component({
  selector: 'app-external-doc',
  templateUrl: './external-doc.view.html',
  styleUrls: ['./external-doc.view.scss'],
})
export class ExternalDocView implements OnInit, AfterViewInit, OnDestroy {
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
    const libName = this.route.snapshot.data.libName;
    this.coreStateFacade.setPageTitle(`@cognizone/${libName}`);
    const src = this.route.snapshot.queryParams.src ?? `assets/docs/${libName}/index.html`;
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl(src);
  }

  ngOnDestroy(): void {
    this.coreStateFacade.resetPageTitle();
  }

  ngAfterViewInit(): void {
    const iframe = this.docFrame.nativeElement;
    iframe.onload = async () => {
      iframe.width = iframe.contentWindow?.document.body.scrollWidth.toString() ?? '';
      iframe.height = iframe.contentWindow?.document.body.scrollHeight.toString() ?? '';
      await this.router.navigate([], { queryParams: { src: iframe.contentWindow?.location.href } });
    };
  }
}
