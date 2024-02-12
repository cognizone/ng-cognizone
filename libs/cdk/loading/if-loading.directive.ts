import { Directive, Input, TemplateRef } from '@angular/core';

import { AbstractLoadDirective } from './abstract-load.directive';

/**
 * @example ```html
 * <div *czIfLoading="'my-key'">I'm visible if my-key is loading in LoadingService</div>
 * <div *czIfLoading>I'm visible if the key used by the provided LoadingService is loading</div>
 * ```
 */
@Directive({
  selector: '[czIfLoading]',
  standalone: true,
})
export class IfLoadingDirective extends AbstractLoadDirective {
  @Input('czIfLoading')
  loadingKey?: string;
  @Input('czIfLoadingElse')
  else?: TemplateRef<unknown>;

  protected type: 'loaded' | 'loading' = 'loading';
}
