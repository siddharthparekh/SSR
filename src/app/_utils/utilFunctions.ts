import { diacriticsMap } from './dataAcents';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

export var updateShoppingCarTrigger: any;
export var OnUpdateShoppingCar = new Observable<any>((obs: any) => {
   updateShoppingCarTrigger = obs;
}).pipe(share());


export class UtilFunctions {
   constructor() { }

   public assignPropToObject(obj: any, prop: string[], value: any): void {
      if (prop.length > 1) {
         var p = prop.shift();
         if (obj[p] == null || typeof obj[p] !== 'object') {

            obj[p] instanceof Array ? [] : {};
         }
         this.assignPropToObject(obj[p], prop, value);
      } else
         obj[prop[0]] = value;
   }
   public static removeDiacritics(str) {
      return str.replace(/[^\u0000-\u007E]/g, function (a) {
         return diacriticsMap[a] || a;
      });
   }
   public static capitalizeFirstLetter(string: string) {
      if (!string) return;
      string = string.toLocaleLowerCase();
      return string.charAt(0).toUpperCase() + string.slice(1);
   }


}
