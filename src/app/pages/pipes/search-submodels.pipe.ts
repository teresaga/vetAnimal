import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchSubmodels'
})
export class SearchSubmodelsPipe implements PipeTransform {

  transform(items: any, term: any): any {
    if(term === undefined){
      return items;
    }
    return items.filter(function(item){
      var buscar = item.name;
      return buscar.toLowerCase().includes(term.toLowerCase());
    });
  }

}
