import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dates'
})
export class DatesPipe implements PipeTransform {

  transform(item: String): any {
    
    if(item!=null){
      var substr = item.substr(0,10);
      return substr;
    }
  }

}
