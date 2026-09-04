import { Pipe, PipeTransform } from '@angular/core';

const CHAR_NUMBER = 40;
@Pipe({
  name: 'trimTitle',
})
export class TrimTitlePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    return value.length > CHAR_NUMBER ? value.slice(0, CHAR_NUMBER) + '...' : value;
  }
}
