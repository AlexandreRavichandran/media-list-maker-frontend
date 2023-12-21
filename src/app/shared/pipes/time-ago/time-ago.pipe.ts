import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  private timeInSecondsConstants: { [label: string]: number } = {
    'month': 2419200,
    'week': 604800,
    'day': 86400,
    'hour': 3600,
    'minute': 60,
    'second': 1,
  };

  transform(date: Date): string | null {

    const seconds: number = this.getDifferenceComparedToTodayInSeconds(date);

    return this.guessTimeAgoBySeconds(seconds) === '' ?
      null
      : this.guessTimeAgoBySeconds(seconds) + ' ago';

  }

  private getDifferenceComparedToTodayInSeconds(dateToCompare: Date): number {

    const today: number = new Date().getTime();
    const date: number = new Date(dateToCompare).getTime();

    return Math.round((today - date) / 1000);

  }

  private guessTimeAgoBySeconds(seconds: number): string {

    let number: number = 0;

    for (const index in this.timeInSecondsConstants) {
      number = Math.floor(seconds / this.timeInSecondsConstants[index]);
      if (number > 0) {
        return this.managePluralIfNecessary(number, index);
      }
    }

    return '';

  }

  private managePluralIfNecessary(number: number, timeAgoInSingular: string): string {

    let timeAgo: string = timeAgoInSingular;

    if (number > 1) {
      timeAgo += 's';
    }

    return number + ' ' + timeAgo;

  }

}
