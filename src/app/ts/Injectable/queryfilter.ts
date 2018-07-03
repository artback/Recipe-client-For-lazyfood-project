import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'matchesSearch'
})
@Injectable()
export class Queryfilter implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
      if (!items) { return []; }
      if (!searchText) { return items; }
      searchText = searchText.toLocaleLowerCase().trim();
      return items.filter( it => {
        return it.name.toLowerCase().includes(searchText);
      });
  }
}
