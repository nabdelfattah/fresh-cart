import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateId',
})
export class TruncateIdPipe implements PipeTransform {
  transform(value: string | undefined | null, length = 6): string {
    if (!value) return '';

    return value.slice(0, length);
  }
}
