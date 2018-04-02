import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'matchesSearch'
})
@Injectable()
export class Queryfilter implements PipeTransform {
    transform(value: any, args: string[]): any {
    const filter = args[0].toLocaleLowerCase();
    return filter ? value.filter(query => query.title.toLocaleLowerCase().indexOf(filter) !== -1) : value;
  }
}
