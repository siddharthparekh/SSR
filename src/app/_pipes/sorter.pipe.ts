import {Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sort'
})

export class SortPipe implements PipeTransform {
    transform(array: Array<any>, args: string): Array<any> {
        if (!args || !array) {
            return array;
        }
        let direction = args[0][0];
        let column = args.replace('-','');
        array.sort((a: any, b: any) => {
            let left = Number(new Date(a[column]));
            let right = Number(new Date(b[column]));
            if( left == 0 || right == 0) return left - right;
            return (direction === "-") ? right - left : left - right;
        });
        return array;
    }
}
