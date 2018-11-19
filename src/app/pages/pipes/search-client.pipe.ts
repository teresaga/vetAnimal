import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchClient'
})
export class SearchClientPipe implements PipeTransform {

  transform(items: any, term: any): any {
    if(term === undefined){
      return items;
    }
    return items.filter(function(item){
      var buscar = item.name + item.paternal_surname + item.maternal_surname + item.birthdate + item.address + item.tel + item.email;
      return buscar.toLowerCase().includes(term.toLowerCase());
    });
  }

}
