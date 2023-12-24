import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToTime'
})
export class TimestampToTimePipe implements PipeTransform {

  transform(timestamp: number): string {

    const date = new Date(Number(timestamp));
    const hour = date.getUTCHours() === 0 ? '' : date.getUTCHours();
    const minute = date.getUTCMinutes() === 0 ? '' : date.getUTCMinutes();
    const second = date.getUTCSeconds() === 0 ? '' : date.getUTCSeconds();

    return this.addZeroIfNumberBetween0And9(hour)
      + ':' + this.addZeroIfNumberBetween0And9(minute)
      + ':' + this.addZeroIfNumberBetween0And9(second);

  }

  private addZeroIfNumberBetween0And9(number: number | string): string {

    if (number === '') {
      return '00'
    }

    if (Number(number) >= 0 && Number(number) <= 9) {
      return '0' + number;
    }

    return number.toString();

  }

}
