import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUsers'
})
export class SearchUsersPipe implements PipeTransform {

  transform(items: any, term: any): any {
    if(term === undefined){
      return items;
    }
    return items.filter(function(item){
      var buscar = item.name + item.worker.name + item.worker.paternal_surname + item.worker.maternal_surname + item.role;
      return buscar.toLowerCase().includes(term.toLowerCase());
    });
  }

}
