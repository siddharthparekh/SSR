
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SharedUserService } from '../_services/shared-user.service';
import { HandleError } from '../_utils/handleError';
import { ISentencia, Sentencia } from '../_models/Sentencia';
import { shareReplay } from 'rxjs/operators';

interface SentencesData {
   resoluciones: ISentencia[],
   total: number
};


@Injectable()
export class SentenceService {

   private BASE_URL = environment.api_url;

   constructor(private handleError: HandleError, private http: HttpClient, private sharedUserService: SharedUserService) { }

   parseSentence = (res: any): ISentencia => {
      return new Sentencia(res);
   }

   addSentence = (sentence: any): Observable<ISentencia> => {
      return this.http.post<ISentencia>(this.BASE_URL + '/users/sentencia',
         sentence,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }
      ).pipe(catchError(this.handleError.handleError));
   }
   getSentences = (
      usuarioId?: number,
      configPagination?: { currentPage: number, itemsPerPage: number }
   ): Observable<SentencesData> => {
      usuarioId = usuarioId || this.sharedUserService.getUserId();
      let url = this.BASE_URL + '/users/' + usuarioId + '/sentencias';
      const page = configPagination && configPagination.currentPage || 0;
      if (configPagination) {
         const itemsPerPage = configPagination.itemsPerPage;
         // url = url.concat(`?limit=${page * itemsPerPage}&offset=${(page * itemsPerPage - itemsPerPage)}`);
         url = url.concat(`?page=${page}&itemsPerage=${itemsPerPage}`);
      }
      return this.http.get(url,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) })
         .pipe(
            map((data: any) => {
               return {
                  resoluciones: data.resoluciones.map(resolucion => new Sentencia(resolucion)),
                  total: data.total
               };
            }),
            catchError(this.handleError.handleError));
   }
   getDetailSentence = (sentenceId: number): Observable<ISentencia> => {
      const url = this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/sentencias/' + sentenceId;
      return this.http.get(
         url,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) })
         .pipe(
            map(this.parseSentence),
            catchError(this.handleError.handleError)
         );
   }
   getAllSentences = (page: number): Observable<Array<ISentencia>> => {
      return this.http.get(this.BASE_URL + '/sentencias' + '?page=' + page).pipe(
         map((s: any) => s.map(this.parseSentence)),
         catchError(this.handleError.handleError));
   }
   countSentencias = (): Observable<{ count: number }> => {
      return this.http.get<{ count: number }>(this.BASE_URL + '/count/sentences').pipe(catchError(this.handleError.handleError));
   }

   deleteSentence = (id: number): Observable<{ count: number }> => {
      return this.http.delete<{ count: number }>(this.BASE_URL + '/users/sentencia/' + id,
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }).pipe(
            catchError(this.handleError.handleError));
   }

}
