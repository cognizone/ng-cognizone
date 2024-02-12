import { Directive, Input, TemplateRef } from '@angular/core';

import { AbstractLoadDirective } from './abstract-load.directive';

/**
 * @example ```html
 * <div *czIfLoaded="'my-key'">I'm visible if my-key is not loading in LoadingService</div>
 * <div *czIfLoaded>I'm visible if the key used by the provided LoadingService is not loading</div>
 * ```
 */
@Directive({
  selector: '[czIfLoaded]',
  standalone: true,
})
export class IfLoadedDirective extends AbstractLoadDirective {
  @Input('czIfLoaded')
  loadingKey?: string;
  @Input('czIfLoadedElse')
  else?: TemplateRef<unknown>;

  protected type: 'loaded' | 'loading' = 'loaded';
}
