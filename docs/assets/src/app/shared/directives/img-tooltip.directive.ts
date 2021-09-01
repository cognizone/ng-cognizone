import { Directive, Input, Type } from '@angular/core';

import { ImgTooltipComponent } from '../components/img-tooltip/img-tooltip.component';

import { AbstractTooltipDirective } from './abstract-tooltip.directive';

@Directive({
  selector: '[appImgTooltip]',
})
export class ImgTooltipDirective extends AbstractTooltipDirective<ImgTooltipComponent> {
  @Input()
  appImgTooltip!: string;

  @Input()
  href?: string;

  @Input()
  imgStyle?: ImgTooltipComponent['style'];

  protected component: Type<ImgTooltipComponent> = ImgTooltipComponent;

  protected linkInputs(instance: ImgTooltipComponent): void {
    instance.src = this.appImgTooltip;
    instance.target = this.href;
    instance.style = this.imgStyle;
  }
}
