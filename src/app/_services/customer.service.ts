
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { HandleError } from '../_utils/handleError';
import { SharedUserService } from './shared-user.service';
import { Usuario, IUsuario } from './../_models/Usuario';

@Injectable()
export class CustomerService {

  private BASE_URL = environment.api_url;
  data = {};

  constructor(private handleError: HandleError, private http: HttpClient, private sharedUserService: SharedUserService) {

  }

  googleAuth(data): Observable<any> {
    return this.http.post(this.BASE_URL + '/customers/google', data).pipe(catchError(this.handleError.handleError));
  }

  facebookAuth(data): Observable<any> {
    return this.http.post(this.BASE_URL + '/customers/facebook', data).pipe(catchError(this.handleError.handleError));
  }

  customerSignUp(nombre: string, email: string, password: string, privacidad: boolean, noticias: boolean): Observable<any> {
    return this.http.post(this.BASE_URL + '/customers/signup',
      { nombre, email, password, privacidad, noticias }
    ).pipe(catchError(this.handleError.handleError));
  }

//   customerSignIn(email: string, password: string): Observable<{ user: IUsuario, token: string }> {
//     return this.http.post(this.BASE_URL + '/users/signin', { email: email, password: password }).pipe(
//       map((res: any) => { return { user: new Usuario(res.user), token: res.token } }),
//       catchError(this.handleError.handleError), );
//   }
  confirmAccount(email: string, token: string): Observable<any> {
    return this.http.post(this.BASE_URL + '/users/confirmaccount', { email: email, token: token }).pipe(
      catchError(this.handleError.handleError));
  }
  updateDatosFacturacion(form: any): Observable<IUsuario> {
    return this.http.put(this.BASE_URL + '/customers/' + this.sharedUserService.getUserId() + '/facturacion', form,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken())
      }).pipe(
        map(user => new Usuario(user)),
        catchError(this.handleError.handleError), );
  }

}
