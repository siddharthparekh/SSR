
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HandleError } from '../_utils/handleError';
import { IProfesional, Profesional } from './../_models/Profesional';
import { IExperiencia, Experiencia } from './../_models/Experiencia';
import { IEducacion, Educacion } from './../_models/Educacion';
import { SharedUserService } from './../_services/shared-user.service';
import { UtilFunctions } from '../_utils/utilFunctions';
import { CareerItem } from '../profile/details/about/interfaces';
import { parseCarrerItem } from '../profile/details/about/about.service';

@Injectable()
export class ProfesionalService {
   private BASE_URL = environment.api_url;
   private utils: UtilFunctions = new UtilFunctions();

   constructor(private http: HttpClient, private handleError: HandleError, private sharedUserService: SharedUserService) { }

   parseProfesional = (res: any): Profesional => {
      return new Profesional(res);
   }
   parseExperience = (res: any): Experiencia => {
      return new Experiencia(res);
   }
   parseEducacion = (res: any): Educacion => {
      return new Educacion(res);
   }

   updateUser(user: any): Observable<void> {
      return this.http.put<void>(this.BASE_URL + '/users/' + this.sharedUserService.getUserId(), user, {
         headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken())
      }).pipe(catchError(this.handleError.handleError));
   }
   findUserProfile(id: number): Observable<IProfesional> {
      return this.http.get(this.BASE_URL + '/users/' + id).pipe(
         map(this.parseProfesional),
         catchError(this.handleError.handleError));
   }
   findFullUserProfile(id: number): Observable<IProfesional> {
      return this.http.get(this.BASE_URL + '/users/' + id + '/full').pipe(
         map(this.parseProfesional),
         catchError(this.handleError.handleError));
   }

   searchProfesionalByName(term: string): Observable<string[]> {
      return this.http.get<string[]>(this.BASE_URL + '/search/users/name?q=' + term)
         .pipe(catchError(this.handleError.handleError));
   }

   findUserProfileAdmin(idSolr: string): Observable<IProfesional> {
      return this.http.get(this.BASE_URL + '/admin/users/' + idSolr).pipe(
         map(this.parseProfesional),
         catchError(this.handleError.handleError));
   }
   findUsersByApellidos(apellidos?: string): Observable<IProfesional[]> {
      return this.http.get(this.BASE_URL + '/users?queryString=' + apellidos).pipe(
         map((u: any) => u.map(this.parseProfesional)),
         catchError(this.handleError.handleError));
   }
   createExperience(exp: any): Observable<CareerItem> {
      return this.http.post<CareerItem>(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/experiencia',
         exp,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) })
         .pipe(
            map(parseCarrerItem),
            catchError(this.handleError.handleError)
         );
   }
   updateExperience(exp: any): Observable<IExperiencia> {
      return this.http.put(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/experiencia/' + exp.id,
         exp,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }).pipe(
            map(this.parseExperience),
            catchError(this.handleError.handleError));
   }
   deleteExperience(id: number): Observable<any> {
      return this.http.delete(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/experiencia/' + id,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) })
         .pipe(
            catchError(this.handleError.handleError)
         );
   }
   createEducation(edu: any): Observable<IEducacion> {
      return this.http.post(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/educacion', edu, {
         headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken())
      }).pipe(
         map(this.parseEducacion),
         catchError(this.handleError.handleError));
   }
   updateEducation(edu: any): Observable<IEducacion> {
      return this.http.put(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/educacion/' + edu.id, edu, {
         headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken())
      }).pipe(
         map(this.parseEducacion),
         catchError(this.handleError.handleError));
   }
   deleteEducation(id: number): Observable<any> {
      return this.http.delete(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/educacion/' + id,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }
      ).pipe(catchError(this.handleError.handleError));
   }
   updatePresentationText(presentation_text: string): Observable<IProfesional> {
      return this.http.put(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/presentation_text',
         { presentation_text: presentation_text }, {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken())
         }).pipe(
            map(this.parseProfesional),
            catchError(this.handleError.handleError));
   }
   findRegistrationCode(code: string): Observable<{ registration_code: string }> {
      const url = `${this.BASE_URL}/users/code/${code}`;
      return this.http.get<{ registration_code: string }>(url)
         .pipe(catchError(this.handleError.handleError));
   }
   checkRegistrationCode(email: string, code: string): Observable<{ ok: boolean, message: string }> {
      return this.http.post<{ ok: boolean, message: string }>(this.BASE_URL + '/users/' + email + '/code', { code: code }).pipe(
         catchError(this.handleError.handleError));
   }
   searchRanking(derecho: string, options): Observable<{ data: IProfesional[], nResults: number }> {
      let query = `/search_ranking?right=${derecho}`;
      for (let key in options) {
         if (options[key] !== undefined) query = query.concat(`&${key}=${options[key]}`);
      }
      const tokenHeader = this.sharedUserService.getAuthorizationHeader() || {};
      return this.http.get<{ data: IProfesional[], nResults: number, warnings: any }>(this.BASE_URL + query, tokenHeader)
         .pipe(
            map((res: any) => {
               return {
                  data: res.data.values,
                  warnings: res.data.warnings,
                  nResults: res.data.nResults
               }
            }),
            catchError(this.handleError.handleError));
   }
   searchUsers(q: string, options: any): Observable<{ data: IProfesional[], nResults: number, warnings: any }> {
      let query = `/search?q=${q}`;
      for (let key in options) {
         if (options[key] !== undefined) query = query.concat(`&${key}=${options[key]}`);
      }
      const tokenHeader = this.sharedUserService.getAuthorizationHeader() || {};
      return this.http.get<{ data: IProfesional[], nResults: number, warnings: any }>(this.BASE_URL + query, tokenHeader)
         .pipe(
            map((res: any) => {
               return {
                  data: res.data.values,
                  warnings: res.data.warnings,
                  nResults: res.data.nResults,
               }
            }),
            catchError(this.handleError.handleError));
   }

   countProfesionales = (): Observable<{ count: number }> => {
      return this.http.get<{ count: number }>(this.BASE_URL + '/count/users').pipe(catchError(this.handleError.handleError));
   }

   countRegistrados = (): Observable<{ count: number }> => {
      return this.http.get<{ count: number }>(this.BASE_URL + '/count/users/registered').pipe(catchError(this.handleError.handleError));
   }

   getRegistrados = (): Observable<any> => {
      const tokenHeader = this.sharedUserService.getAuthorizationHeader() || {};
      return this.http.get(this.BASE_URL + '/registered', tokenHeader).pipe(catchError(this.handleError.handleError));
   }

   getPagosRecibidos = (id: number, date1: Date, date2: Date): Observable<any> => {
      return this.http.post(this.BASE_URL + '/pagos/' + id + '/recibidos',
         { date1: date1, date2: date2 },
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }).pipe(
            catchError(this.handleError.handleError));
   }
   updatePreciosConsultas(categoriasPrecios: any): Observable<any> {
      return this.http.put(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/precios',
         categoriasPrecios,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) })
         .pipe(catchError(this.handleError.handleError));
   }

   getPosicionSobreMedia(userId, derechos): Observable<any> {
      return this.http.post(this.BASE_URL + '/users/media/' + userId,
         { derechos: derechos }).pipe(
            catchError(this.handleError.handleError));
   }

   updateEstadoConsultas(): Observable<boolean> {
      return this.http.put<boolean>(this.BASE_URL + '/consultas/users/' + this.sharedUserService.getUserId(),
         {},
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) })
         .pipe(catchError(this.handleError.handleError));
   }

   updateEstadoSignUp(id, verificacion): Observable<IProfesional> {
      return this.http.put(this.BASE_URL + '/users/signup/' + id,
         { verificacion: verificacion },
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }).pipe(
            map(this.parseProfesional),
            catchError(this.handleError.handleError));
   }
   updateVisualizacionPerfil(visualizacion: { perfil?: number }): Observable<boolean> {
      const id = this.sharedUserService.getUserId();
      return this.http.put<boolean>(this.BASE_URL + '/users/' + id + '/visualizacionperfil',
         { perfil: visualizacion.perfil },
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }).pipe(
            catchError(this.handleError.handleError)
         );
   }
}
