import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchWorker'
})
export class SearchWorkerPipe implements PipeTransform {

  transform(items: any, term: any): any {
    if(term === undefined){
      return items;
    }
    return items.filter(function(item){
      var buscar = item.name + item.paternal_surname + item.maternal_surname + item.age + item.address + item.tel + item.email + item.job.name;
      return buscar.toLowerCase().includes(term.toLowerCase());
    });
  }

}
