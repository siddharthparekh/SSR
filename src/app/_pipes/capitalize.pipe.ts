import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {

  transform(value: any) {
    if (value) {
      value = value.toLowerCase();
      var res = "";
      var arr = value.split(" ");
      for (let i of arr) {
        res += i.charAt(0).toUpperCase() + i.slice(1) + " ";
      }
      return res;
    }
    return '';
  }

}
