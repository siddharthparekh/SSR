import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { IProducto, Producto } from '../_models/Producto';

@Injectable()
export class ProfileService {

   private BASE_URL = environment.api_url;

   constructor(
      private httpClient: HttpClient,
   ) { }

   fethProduct(profeisionalId: string | number, derechoId: string, isCategoria: boolean, alcance: string): Observable<IProducto[]> {
      let url = this.BASE_URL + `/users/${profeisionalId}/productos?`;
      if (derechoId) url = url.concat(`derechoId=${derechoId}`);
      if (isCategoria) url = url.concat(`&categoria=true`);
      if (alcance) url = url.concat(`&alcance=${alcance}`);
      return this.httpClient.get<any>(url)
         .map(productos => productos.map(producto => new Producto(producto)));
   }
}
