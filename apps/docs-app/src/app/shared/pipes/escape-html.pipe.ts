import { Pipe, PipeTransform } from '@angular/core';
import { escapeHtml } from '@app/core/utils/escape-html';

@Pipe({
  name: 'escapeHtml',
})
export class EscapeHtmlPipe implements PipeTransform {
  transform(value: string): string {
    return escapeHtml`${value}`;
  }
}
