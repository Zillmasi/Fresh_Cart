import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone:true
})
export class SearchPipe implements PipeTransform {
  transform(Array:any[], term:string):any[] {

    return Array.filter((item)=>item.title.toLowerCase().includes(term.toLowerCase()));
  }

}
