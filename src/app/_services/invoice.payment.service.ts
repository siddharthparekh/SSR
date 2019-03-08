import { Injectable } from '@angular/core';
import { HandleError } from '../_utils/handleError';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SharedUserService } from './shared-user.service';
import { ICliente, Cliente } from '../_models/Cliente';

@Injectable()
export class InvoicePaymentService {
   private BASE_URL = environment.api_url;
   constructor(
      private handleError: HandleError,
      private http: HttpClient,
      private sharedUserService: SharedUserService
   ) {
   }


   product_payment(invoice: any): Observable<{ charge: any, token: string }> {
      const userId = this.sharedUserService.getUserId();
      return this.http.post<any>(this.BASE_URL + `/users/${userId}/productos/payment`,
         invoice,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) })
         .pipe(
            catchError(this.handleError.handleError)
         );
   }

   no_user_payment(invoice: any): Observable<{ charge: any, token: string, user: ICliente }> {
      return this.http.post<any>(this.BASE_URL + `/users/productos/payment`, invoice)
         .pipe(
            map((res: any) => {
               return {
                  charge: res.charge,
                  token: res.token,
                  user: new Cliente(res.user)
               };
            }),
            catchError(this.handleError.handleError)
         );
   }
}