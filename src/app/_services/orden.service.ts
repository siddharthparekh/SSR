
import {catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HandleError } from '../_utils/handleError';


@Injectable()
export class OrdenService {

  private BASE_URL = environment.api_url;

  constructor(private handleError:HandleError, private http: HttpClient) { }

  findOrdenes = (): Observable<any> => {
    return this.http.get(this.BASE_URL+'/ordenes').pipe(catchError(this.handleError.handleError));
  }

}
