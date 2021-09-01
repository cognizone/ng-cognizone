import { Pipe, PipeTransform } from '@angular/core';
import { calculateReadingTimeMinutes } from '@app/core';

@Pipe({
  name: 'readingTime',
})
export class ReadingTimePipe implements PipeTransform {
  transform(value?: string): string {
    if (!value) return '';
    let minutes = calculateReadingTimeMinutes(value);
    minutes = Math.ceil(minutes);
    return `${minutes} min read`;
  }
}
