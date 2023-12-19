import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDateFormat'
})
export class CustomDateFormatPipe implements PipeTransform {

  transform(date: Date): string | null {
    const datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'dd-MM-yyyy');
  }

}
