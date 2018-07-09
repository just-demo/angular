import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indexes'
})
export class IndexesPipe implements PipeTransform {
  transform(value: any[], args?: any): any {
    return value ? Array.from(Array(value.length).keys()) : [];
  }
}
