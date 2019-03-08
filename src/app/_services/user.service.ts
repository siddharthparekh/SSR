import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HandleError } from '../_utils/handleError';
import { SharedUserService } from '../_services/shared-user.service';
import { IProfesional } from '../_models/Profesional';
import { ICliente, Cliente } from '../_models/Cliente';
import { IUsuario, Usuario } from '../_models/Usuario';
import { Profesional } from './../_models/Profesional';

@Injectable()
export class UserService {

   private BASE_URL = environment.api_url;

   constructor(private sharedUserService: SharedUserService,
      private handleError: HandleError,
      private http: HttpClient) {
   }
   signUpCert(data): Observable<{ token: string, user: IProfesional }> {
      return this.http.post<{ token: string, profesional: any }>(this.BASE_URL + '/users/signup_cert', {
         c: data.c,
         id: data.id,
         email: data.email
      }, {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + data.token)
         }).pipe(map(userInfo => {
            return { token: userInfo.token, user: new Profesional(userInfo.profesional) }
         })
            , catchError(this.handleError.handleError));
   }
   signInCert(data): Observable<{ token: string, profesional: IProfesional }> {
      return this.http.post<{ token: string, profesional: any }>(this.BASE_URL + '/users/signin_cert', {
         id: data.id
      }, {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + data.token)
         }).pipe(
            map((o: any) => {
               return {
                  token: o.token,
                  profesional: new Profesional(o.profesional)
               }
            }),
            catchError(this.handleError.handleError)
         );
   }
   login(email: string, password: string): Observable<{ token: string, user: any }> {
      return this.http.post<{ token: string, user: any }>
         (this.BASE_URL + '/users/signin', { email: email, password: password })
         .pipe(
            map(res => {
               if (res.user.Usuario.tipo == 1) res.user = new Cliente(res.user);
               else res.user = new Profesional(res.user);
               return res;
            }),
            catchError(this.handleError.handleError));
   }
   signUpLawyerB(user: any): Observable<{ token: string }> {
      return this.http.post<{ token: string }>(this.BASE_URL + '/users/signupLawyerB', user).pipe(catchError(this.handleError.handleError));
   }
   signup(user: any): Observable<{ token: string }> {
      return this.http.post<{ token: string }>(this.BASE_URL + '/users/signup', user).pipe(catchError(this.handleError.handleError));
   };
   emailExist(email: string): Observable<{ ok: boolean }> {
      return this.http.get<{ ok: boolean }>(this.BASE_URL + '/email/' + email).pipe(
         catchError(this.handleError.handleError));
   }
   resetPassword(token: string, email: string, password: string): Observable<{ ok: boolean }> {
      return this.http.post<{ ok: boolean }>(this.BASE_URL + '/users/resetpassword', {
         token: token,
         email: email,
         password: password
      }).pipe(catchError(this.handleError.handleError));
   }
   recoverPassword(email: string): Observable<{ ok: boolean }> {
      return this.http.post<{ ok: boolean }>(this.BASE_URL + '/users/recuperarpassword', {
         email: email
      }).pipe(catchError(this.handleError.handleError));
   }
   sendSuggestion(suggestion: string, userId: number, ecli?: string): Observable<{ ok: boolean }> {
      return this.http.post<{ ok: boolean }>(this.BASE_URL + '/users/' + userId + '/suggestion',
         {
            ecli: ecli,
            suggestion: suggestion
         }
      ).pipe(catchError(this.handleError.handleError));
   }
   contact(params: any): Observable<{ ok: boolean }> {
      return this.http.post<{ ok: boolean }>(this.BASE_URL + '/contacto',
         {
            email: params.email,
            asunto: params.asunto,
            texto: params.texto,
            nombre: params.nombre,
            privacidad: params.privacidad,
            noticias: params.noticias
         }
      ).pipe(catchError(this.handleError.handleError));
   }
   uploadPhoto(photo: File): Observable<IUsuario> {
      return Observable.create(observer => {
         const formData = new FormData();
         formData.append('file', photo);
         const xhr = new XMLHttpRequest();
         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               if (xhr.status === 200) {
                  observer.next(JSON.parse(xhr.response))
                  observer.complete()
               } else {
                  observer.error(xhr.response)
               }
            }
         }
         xhr.open("POST", this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/photo', true);
         xhr.setRequestHeader('Authorization', 'Bearer ' + this.sharedUserService.getToken());
         xhr.send(formData)
      });
   }
   updateUserCredentials(user: any): Observable<IUsuario> {
      return this.http.put<IUsuario>(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/credentials', user, {
         headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken())
      }).pipe(catchError(this.handleError.handleError));
   }
   updatePassword(form: any): Observable<void> {
      const headersToken = this.sharedUserService.getAuthorizationHeader() || {};
      return this.http.put<void>(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/password',
         form, {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken())
         })
         .pipe(catchError(this.handleError.handleError));
   }
}
