import {
   catchError,
   tap,
   map,
   debounceTime,
   distinctUntilChanged,
   switchMap,
} from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import {
   HttpClient,
   HttpResponse,
   HttpErrorResponse,
   HttpHeaders,
   HttpRequest,
} from '@angular/common/http'
import { environment } from '../../environments/environment'
import { HandleError } from '../_utils/handleError'
import { Derecho, IDerecho } from './../_models/Derecho'
import { UtilFunctions } from '../_utils/utilFunctions';

@Injectable()
export class RightService {
   private BASE_URL = environment.api_url

   constructor(private handleError: HandleError, private http: HttpClient) { }

   findDerechos = (): Observable<IDerecho[]> => {
      return this.http.get(this.BASE_URL + '/derechos').pipe(
         map((derechos: any[]) => derechos.map(d => {
            d.nombre = UtilFunctions.capitalizeFirstLetter(d.nombre);
            return new Derecho(d)
         })),
         catchError(this.handleError.handleError)
      )
   }

   searchCombined(term): Observable<any> {
      return this.http
         .get(this.BASE_URL + '/searchall?q=' + term)
         .pipe(catchError(this.handleError.handleError))
   }

   getRights = (): Observable<IDerecho[]> => {
      return this.http
         .get<IDerecho[]>(this.BASE_URL + '/arbol/derechos')
         .pipe(catchError(this.handleError.handleError))
   }

   getParents = (id: number): Observable<any> => {
      return this.http
         .get(this.BASE_URL + '/arbol/' + id + '/padres')
         .pipe(catchError(this.handleError.handleError))
   }

   getChildren = (id: number): Observable<any> => {
      return this.http
         .get(this.BASE_URL + '/arbol/' + id + '/hijos')
         .pipe(catchError(this.handleError.handleError))
   }

   findRights(derecho?: string): Observable<IDerecho[]> {
      return this.http
         .get<IDerecho[]>(
            this.BASE_URL + '/arbol/derechos/search?derecho=' + derecho
         )
         .pipe(catchError(this.handleError.handleError))
   }
   /**
    * funcion que busca materia, keyword o derecho (area del derecho)
    */
   searchMateriasYDerechos(
      term: Observable<string>
   ): Observable<
   { derechoConcreto?: string; nombre: string; tipo: string; id: string }[]
   > {
      return term.pipe(
         debounceTime(400),
         distinctUntilChanged(),
         switchMap(term =>
            this.http
               .get<any[]>(
                  this.BASE_URL + '/search/derechos_y_materias?q=' + term
               )
               .pipe(
                  map(derechos =>
                     derechos.map(derecho => {
                        return {
                           derechoConcreto: UtilFunctions.capitalizeFirstLetter(derecho.derechoConcreto),
                           nombre: UtilFunctions.capitalizeFirstLetter(derecho.derecho),
                           tipo: derecho.tipo,
                           id: derecho.idDerecho,
                        }
                     })
                  ),
                  catchError(this.handleError.handleError)
               )
         )
      )
   }

   getTree() {
      return this.http
         .get(this.BASE_URL + '/arbol')
         .pipe(catchError(this.handleError.handleError))
   }
}
