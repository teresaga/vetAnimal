import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  transform(item: String): any {
    if(item!=null){
      var substr = item.substr(0,10);
      var substr2 = item.substr(11,5);
      return substr + " " + substr2;
    }
  }

}
