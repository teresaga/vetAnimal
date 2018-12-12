import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busquedas'
})
export class BusquedasPipe implements PipeTransform {

  transform(items: any, term: any): any {
    if(term === undefined){
      return items;
    }
    return items.filter(function(item){
      if(item.description){
        var buscar = item.description;
      }else if(item.name && item.paternal_surname){
        var buscar = item.name + item.paternal_surname + item.maternal_surname;
      }else if(item.name && !item.paternal_surname){
        var buscar = item.name;
      }
      return buscar.toLowerCase().includes(term.toLowerCase());
    });
  }

}
