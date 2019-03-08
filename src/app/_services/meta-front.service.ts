import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HandleError } from '../_utils/handleError';
import { SharedUserService } from './../_services/shared-user.service';


@Injectable()
export class MetaFrontService {

  private BASE_URL = environment.api_url;

  constructor(
    private handleError: HandleError,
    private http: HttpClient,
    private sharedUserService: SharedUserService
  ) { }

  isPricesSkiped(): Observable<boolean> {
    return this.http.get<boolean>(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/isPricesSkiped',
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) })
      .pipe(catchError(this.handleError.handleError));
  }
  skipTarifas(value: boolean): Observable<void> {
    return this.http.put<void>(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/skipTarifas',
      { shouldSkip: value },
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) })
      .pipe(catchError(this.handleError.handleError));
  }

}
