import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(value: any, searchName:string):any {
    if(searchName == null) return value;
    return value.filter(function(category){
      return category.title.toLowerCase().indexOf(searchName.toLowerCase()) > -1;
    })
  }
}
