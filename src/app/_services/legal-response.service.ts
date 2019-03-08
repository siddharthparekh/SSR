
import { map, catchError, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IMensaje, Mensaje } from './../_models/Mensaje';
import { SharedUserService } from './../_services/shared-user.service';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { HandleError } from './../_utils/handleError';
import { IRespuestaLegal, RespuestaLegal, ICategoria, Categoria } from './../_models/RespuestaLegal';
import { IValoracion, Valoracion } from './../_models/Valoracion';
import { IUsuario, Usuario } from './../_models/Usuario';

@Injectable()
export class LegalResponseService {

   private BASE_URL = environment.api_url;
   resultadoRespuestaLegal: Subject<string> = new Subject<string>();
   resultadoRespuestaLegal$ = this.resultadoRespuestaLegal.asObservable();

   constructor(private http: HttpClient, private handleError: HandleError, private sharedUserService: SharedUserService) { }

   aceptResponse = (): Observable<IRespuestaLegal> => {
      return this.http.post<IRespuestaLegal>(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/respuestaslegales/aceptar', {
      }).pipe(
         catchError(this.handleError.handleError));
   }
   downloadBudget = (respponseId: number): Observable<HttpResponse<any>> => {
      return this.http.get(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/respuestaslegales/' + respponseId + '/presupuesto', {
         headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()),
         responseType: 'blob',
         observe: 'response'
      }).pipe(
         catchError(this.handleError.handleError));
   }
   refuseResponse = (responseId: number): Observable<IRespuestaLegal> => {
      return this.http.put(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/respuestaslegales/' + responseId + '/estado', { estado: 'RECHAZADA' }, {
         headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken())
      }).pipe(map((res: any) => new RespuestaLegal(res)),
         catchError(this.handleError.handleError));
   }

   getLegalResponses = (estado: string): Observable<IRespuestaLegal[]> => {
      return this.http.get(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/respuestaslegales?estadoRespuesta=' + estado, {
         headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken())
      }).pipe(
         map((respuestas: any[]) => respuestas.map(respuesta => new RespuestaLegal(respuesta))),
         catchError(this.handleError.handleError));
   }
   getLegalResponse = (id: number): Observable<IRespuestaLegal> => {
      return this.http.get(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/respuestaslegales/' + id, {
         headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken())
      }).pipe(
         map(respuesta => respuesta ? new RespuestaLegal(respuesta) : null),
         catchError(this.handleError.handleError));

   }
   getCategoriasRespuestasProf = (conversacionId?: number, userId?: number): Observable<ICategoria[]> => {
      const conversacionStr = conversacionId ? `?conversacion=${conversacionId}` : '';
      const usuarioId = userId ? userId : this.sharedUserService.getUserId();
      return this.http.get(`${this.BASE_URL}/users/${usuarioId}/categoriasrespuestas${conversacionStr}`, {
         headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken())
      }).pipe(
         map((response: any) => response.data.map(categoria => new Categoria(categoria))),
         catchError(this.handleError.handleError));
   }
   getCategorias = (): Observable<ICategoria[]> => {
      return this.http.get(this.BASE_URL + '/respuestaslegales/categorias').pipe(
         map((categorias: any) => categorias.map(c => new Categoria(c))),
         catchError(this.handleError.handleError));
   }
   rateLawyerWithResponse = (responseId: number, review: any): Observable<any> => {
      return this.http.post(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/respuestaslegales/' + responseId + '/valoracion',
         review,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }).pipe(
            catchError(this.handleError.handleError));
   }
   getValoracion = (respuestaId: number): Observable<IValoracion> => {
      return this.http.get(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/respuestaslegales/' + respuestaId + '/valoracion', {
         headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken())
      }).pipe(map(valoracion => valoracion ? new Valoracion(valoracion) : null),
         catchError(this.handleError.handleError));
   }
   sendAclaracion = (respuesta: RespuestaLegal, aclaracion: string, options?: any): Observable<IMensaje> => {
      var optionsObj = {};
      if (!options) {
         optionsObj = {
            aclaracion: aclaracion,
            ConversacionId: respuesta.Mensaje.Conversacion.id,
            DestinatarioId: respuesta.Mensaje.Remitente.id
         }
      } else { optionsObj = options };
      return this.http.post(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/respuestaslegales/' + respuesta.id + '/aclaracion',
         optionsObj,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }).pipe(
            map(mensaje => new Mensaje(mensaje)),
            catchError(this.handleError.handleError));
   }
   getAclaracion = (respuestaId: number): Observable<IMensaje[]> => {
      return this.http.get(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/respuestaslegales/' + respuestaId + '/aclaracion', {
         headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken())
      }).pipe(
         map((aclaracion: IMensaje[]) => aclaracion.map(a => new Mensaje(a))),
         catchError(this.handleError.handleError));
   }
   emitReponseResult = (estado: string): void => {
      this.resultadoRespuestaLegal.next(estado);
   }
   saveDraft = (text: string, conversacionId: number): Observable<RespuestaLegal> => {
      if (!text) text = '';
      return this.http.post(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/conversacion/' + conversacionId + '/respuestalegal',
         {
            texto: text
         },
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }).pipe(
            map(respuestaLegal => new RespuestaLegal(respuestaLegal)),
            catchError(this.handleError.handleError));
   }
   getDraft = (conversacionId: number): Observable<IRespuestaLegal> => {
      return this.http.get(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/conversacion/' + conversacionId + '/respuestalegal', {
         headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken())
      }).pipe(
         filter(Boolean),
         map(respuestaLegal => new RespuestaLegal(respuestaLegal)),
         catchError(this.handleError.handleError));
   }

}
