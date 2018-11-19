import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(items: any, term: any): any {
    if(term === undefined){
      return items;
    }
    return items.filter(function(item){
      if(item.measurementunit.name && item.typeproduct.name){
        var buscar = item.description + item.measurementunit.name + item.typeproduct.name + item.price + item.cost + item.provider.name ;
      }else{
        var buscar = item.description + item.price + item.cost + item.provider.name ;
      }
      return buscar.toLowerCase().includes(term.toLowerCase());
    });
  }

}
