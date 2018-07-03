import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sum'
})
export class SumPipe implements PipeTransform {
  transform(value: any[], args?: any): any {
    return value.reduce((a, b) => a + b, 0);
  }
}
