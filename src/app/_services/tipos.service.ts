
import {catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HandleError } from '../_utils/handleError';


@Injectable()
export class TiposService {

  private BASE_URL = environment.api_url;

  constructor(private handleError:HandleError, private http: HttpClient) { }

  getTipos = (tipo: string): Observable<any> => {
    return this.http.get(this.BASE_URL+'/tipos?tipo='+tipo).pipe(catchError(this.handleError.handleError));
  }

  findTipo = (tipo:string, nombre: string): Observable<any> => {
    return this.http.get(this.BASE_URL+'/tipos/search?nombre='+nombre+'&tipo='+tipo).pipe(catchError(this.handleError.handleError));
  }

  getPartidosJudiciales= (): Observable<any> => {
    return this.http.get(this.BASE_URL+'/partidos').pipe(catchError(this.handleError.handleError));    
  }
}
