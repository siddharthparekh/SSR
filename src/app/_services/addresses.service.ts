
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HandleError } from '../_utils/handleError';


@Injectable()
export class AddressesService {

  private BASE_URL = environment.api_url;

  constructor(private handleError: HandleError, private http: HttpClient) { }

  findLocalidades = (q?: string): Observable<any[]> => {
    return this.http.get<any[]>(this.BASE_URL + '/direcciones/localidades?q=' + q).pipe(catchError(this.handleError.handleError));
  }

}
