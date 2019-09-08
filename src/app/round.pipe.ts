import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'round' })
export class RoundPipe implements PipeTransform {
  transform(data: number) {

    if (data === undefined && typeof data === 'string') {

      return;
    } else {
        return Math.round(data * 1000) / 1000;
    }
  }
}
