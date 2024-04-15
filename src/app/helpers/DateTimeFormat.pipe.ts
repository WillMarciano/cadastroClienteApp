import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '@app/util/constants';

@Pipe({
  name: 'DateTimeFormatPipe',
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  override transform(value: any, args?: any): any {
    try {
      if (value !== typeof Date || value !== typeof undefined) {
        let month = value.substring(0, 2);
        let day = value.substring(3, 5);
        let year = value.substring(6, 10);
        let hour = value.substring(11, 13);
        let minutes = value.substring(14, 16);
        value = day + '/' + month + '/' + year + ' ' + hour + ':' + minutes;
        if (value !== '// :')
          return super.transform(value, Constants.DATE_TIME_FMT);
      }
    } catch (erro: any) {
      return super.transform(value, Constants.DATE_TIME_FMT);
      // return value;
    }
  }
}
