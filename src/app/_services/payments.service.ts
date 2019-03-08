
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { HandleError } from '../_utils/handleError';
import { SharedUserService } from '../_services/shared-user.service';
import { Usuario } from './../_models/Usuario';
import { IPago, Pago } from './../_models/Pago';

@Injectable()
export class PaymentsService {

   private BASE_URL = environment.api_url;
   data = {};

   constructor(private handleError: HandleError, private http: HttpClient,
      private sharedUserService: SharedUserService) {

   }

   getAllCards(client_id: number): Observable<any> {
      return this.http.get(this.BASE_URL + '/payments/' + client_id + '/card',
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }
      ).pipe(catchError(this.handleError.handleError));
   }

   addCard(client_id: number, formData: any): Observable<any> {
      return this.http.post(this.BASE_URL + '/payments/' + client_id + '/card/add',
         formData,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }).pipe(
            catchError(this.handleError.handleError));
   }

   deleteCard(client_id: number, card_id: number): Observable<any> {
      return this.http.delete(this.BASE_URL + '/payments/' + client_id + '/card/' + card_id,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }
      ).pipe(catchError(this.handleError.handleError));
   }

   getAllCharges(client_id: number): Observable<IPago[]> {
      return this.http.get(this.BASE_URL + '/payments/' + client_id + '/charge',
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }
      ).pipe(
         map((charges: any[]) => charges.map(charge => new Pago(charge))),
         catchError(this.handleError.handleError));
   }
   newCharge(charge: any): Observable<any> {
      return this.http.post(this.BASE_URL + '/payments/' + this.sharedUserService.getUserId() + '/charge',
         charge,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }
      ).pipe(
         catchError(this.handleError.handleError));
   }
   newChargeRespuestas(charge: any): Observable<any> {
      return this.http.post(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/respuestas/payment',
         charge,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }
      ).pipe(
         catchError(this.handleError.handleError));
   }
   calcularImporte(respuestaLegalId: number): Observable<any[]> {
      return this.http.get<any[]>(this.BASE_URL +
         `/users/${this.sharedUserService.getUserId()}/respuestaslegales/${respuestaLegalId}/calcularImporte`,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }
      ).pipe(catchError(this.handleError.handleError));
   }
   updateDatosFacturacion(datos: any): Observable<void> {
      return this.http.put<void>(this.BASE_URL + '/facturacion/users/' + this.sharedUserService.getUserId(),
         datos,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) })
         .pipe(catchError(this.handleError.handleError));
   }
   getFacturaByPago(pagoId: number): Observable<{ facturaHtml: string }> {
      return this.http.get<{ facturaHtml: string }>(this.BASE_URL +
         `/users/${this.sharedUserService.getUserId()}/factura/${pagoId}`,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }
      ).pipe(catchError(this.handleError.handleError));
   }
   getFacturaRespuestaLegalByPago(pagoId: number): Observable<{ facturaHtml: string }> {
      return this.http.get<{ facturaHtml: string }>(this.BASE_URL +
         `/users/${this.sharedUserService.getUserId()}/facturaAbogado/${pagoId}`,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }
      ).pipe(catchError(this.handleError.handleError));
   }
}
