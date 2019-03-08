import { Injectable } from '@angular/core';
import { HandleError } from '../_utils/handleError';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, forkJoin, Subject } from 'rxjs';
import { catchError, tap, share } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { SharedUserService } from './shared-user.service';
import { IProducto, Producto } from './../_models/Producto';
import { updateShoppingCarTrigger } from '../_utils/utilFunctions';

@Injectable()
export class ShoppingCarService {
   private BASE_URL = environment.api_url;

   private ngUnsubscribe: Subject<void> = new Subject<void>();

   constructor(
      private handleError: HandleError,
      private http: HttpClient,
      private sharedUserService: SharedUserService
   ) {
      let products_string = localStorage.getItem('e4_car_products');
      if (!products_string) {
         localStorage.setItem('e4_car_products', JSON.stringify([]));
      }
      this.sharedUserService.isLogged$.pipe(
         takeUntil(this.ngUnsubscribe))
         .subscribe(isLoggedIn => {
            if (isLoggedIn) {
               this.save_in_memory_product(this.sharedUserService.getUserId());
            }
            updateShoppingCarTrigger.next();
         });
   }

   clear() {
      localStorage.setItem('e4_car_products', JSON.stringify([]));
   }

   save_in_memory_product(user_id: number) {
      let productsLocal: IProducto[] = this.getProductsFromLocalStorage();
      if (productsLocal.length > 0) {
         this.products(user_id).subscribe((product_list: IProducto[]) => {
            const products = productsLocal.filter((pt: IProducto) => {
               return product_list.some((p: IProducto) => {
                  return p.id == pt.id;
               }) == false;
            })
            if (products.length <= 0) {
               localStorage.setItem('e4_car_products', JSON.stringify([]));
               updateShoppingCarTrigger.next(user_id);
            }
            let requests = [];
            products.forEach((item: IProducto) => {
               requests.push(this.save_product(item));
            });
            if (requests.length > 0) {
               forkJoin(requests).subscribe(() => {
                  localStorage.setItem('e4_car_products', JSON.stringify([]));
                  updateShoppingCarTrigger.next(user_id);
               })
            }
         })
      } else {
         updateShoppingCarTrigger.next();
      }
   }

   save_product(product: IProducto): Observable<any[]> {
      const user_id = this.sharedUserService.getUserId();
      if (user_id) {
         return this.http.post<any[]>(this.BASE_URL + `/users/${user_id}/carrito/item`, {
            "productoId": product.id
         }, { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) })
            .pipe(catchError(this.handleError.handleError));
      } else {
         let products = <any[]>JSON.parse(localStorage.getItem('e4_car_products'));
         if (products.some((p: any) => {
            return p.id == product.id;
         }) == false) {
            products.push(product);
            localStorage.setItem('e4_car_products', JSON.stringify(products));
            return new Observable<any>((obs: any) => {
               obs.next(products);
            })
         } else {
            console.log('El producto ya existe en el carrito.')
            return new Observable<any>((obs: any) => {
               obs.next();
            })
         }
      }
   }

   products(user_id?: number): Observable<IProducto[]> {
      if (!user_id)
         user_id = this.sharedUserService.getUserId();
      let products = this.getProductsFromLocalStorage();
      return new Observable<IProducto[]>((obs: any) => {
         if (user_id) {
            return this.http.get<any[]>(this.BASE_URL + `/users/${user_id}/carrito`,
               { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) })
               .pipe(
                  tap((p: any) => p.map(product => new Producto(product))),
                  catchError(this.handleError.handleError),
               )
               .subscribe((ps: IProducto[]) => {
                  obs.next(ps)
               });
         } {
            obs.next(products)
         }
      })
   }

   delete_product(product_id: number): Observable<any[]> {
      const user_id = this.sharedUserService.getUserId();
      if (user_id) {
         return this.http.delete<any[]>(this.BASE_URL + `/users/${user_id}/carrito/item/${product_id}`,
            { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) })
            .pipe(catchError(this.handleError.handleError));
      } else {
         let products = this.getProductsFromLocalStorage();
         products = products.filter((product: any) => {
            return product.id != product_id
         });
         localStorage.setItem('e4_car_products', JSON.stringify(products));
         return new Observable<any>((obs: any) => {
            obs.next(products)
         })
      }
   }

   getProductsFromLocalStorage(): IProducto[] {
      return <IProducto[]>JSON.parse(localStorage.getItem('e4_car_products'))
         .map(producto => new Producto(producto));
   }

   misAbogados(): Observable<{ Profesional: any, Usuario: any, ProfesionalesEstadistica: any, producto: any }[]> {
      return this.http.get<any[]>(this.BASE_URL + `/users/${this.sharedUserService.getUserId()}/compras`,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) })
         .pipe(
            catchError(this.handleError.handleError)
         )
   }

}