import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProvider'
})
export class SearchProviderPipe implements PipeTransform {

  transform(items: any, term: any): any {
    if(term === undefined){
      return items;
    }
    return items.filter(function(item){
      var buscar = item.name + item.business_name + item.rfc + item.tel + item.address + item.email + item.contact_person;
      return buscar.toLowerCase().includes(term.toLowerCase());
    });
  }

}
