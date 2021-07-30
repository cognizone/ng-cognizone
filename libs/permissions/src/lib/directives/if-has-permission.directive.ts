import { ChangeDetectorRef, Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Many, Nil } from '@cognizone/model-utils';
import { OnDestroy$ } from '@cognizone/ng-core';

import { PermissionsService } from '../services/permissions.service';

@Directive({
  selector: '[czIfHasPermission]',
})
export class IfHasPermissionDirective extends OnDestroy$ implements OnInit {
  @Input('czIfHasPermission')
  permissions: Nil<Many<string>>;

  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainer: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.permissionsService
      .hasPermissions(this.permissions)
      .pipe(this.untilDestroyed())
      .subscribe(hasPermission => this.render(hasPermission));
  }

  private render(shouldRender: boolean): void {
    this.viewContainer.clear();
    if (shouldRender) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    this.cdr.markForCheck();
  }
}
