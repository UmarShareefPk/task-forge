// src/app/shared/pipes/relative-time.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

@Pipe({
  name: 'relativeTime',
  standalone: true 
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: any, showFullDate: boolean = false): string {
  if (!value) return '';
  return showFullDate 
    ? dayjs(value).format('MMMM D, YYYY h:mm A') // Tooltip format
    : dayjs(value).fromNow(); // Default relative format
}
}
