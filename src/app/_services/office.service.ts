
import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SharedUserService } from '../_services/shared-user.service';
import { HandleError } from '../_utils/handleError';
import { IDespacho, Despacho } from '../_models/Despacho';
import * as RecursiveIterator from 'recursive-iterator';
import { UtilFunctions } from '../_utils/utilFunctions';


@Injectable()
export class OfficeService {

  private BASE_URL = environment.api_url;
  private utils: UtilFunctions = new UtilFunctions();

  constructor(private handleError: HandleError, private http: HttpClient, private sharedUserService: SharedUserService) { }
  //
  // parseDespacho = (officeResponse: any): IDespacho => {
  //   let o: IDespacho;
  //   o = this.iterate(officeResponse);
  //   return o;
  // }
  // iterate = (obj: any): IDespacho => {
  //   var iterator = new RecursiveIterator(obj, 0, true);
  //   for (var item = iterator.next(); !item.done; item = iterator.next()) {
  //     var state = item.value;
  //     if (state.key === 'Usuario') {
  //       state.path.splice(-1, 1);
  //       this.utils.assignPropToObject(obj, state.path, Object.assign(state.parent, state.node));
  //     }
  //   }
  //   iterator = new RecursiveIterator(obj, 0, true);
  //   for (var item = iterator.next(); !item.done; item = iterator.next()) {
  //     var state = item.value;
  //     if (state.key === 'ProfesionalesDespachos' && state.path[state.path.length - 3] === 'Profesionales') {
  //       state.path.splice(-1, 1); //ruta do pai
  //       this.utils.assignPropToObject(obj, state.path, { Profesional: state.parent, is_admin: state.node.is_admin });
  //     }
  //   }
  //   return obj;
  // }

  parseDespacho = (res: any): Despacho => {
    return new Despacho(res);
  }
  parseDespachos = (res: any[]): Despacho[] => {
    if (res.length === 0)
      return [];
    else
      return res.map(d => new Despacho(d));
  }

  joinOffice(id_office: number): Observable<IDespacho> {
    return this.http.post(this.BASE_URL + '/despachos/' + id_office + '/users/' + this.sharedUserService.getUserId(),
      {},
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }
    ).pipe(
      map(this.parseDespacho),
      catchError(this.handleError.handleError), );
  }
  exitOffice(id_office: number, id_user?: number, forced_exit?: boolean): Observable<{ ok: boolean }> {
    if (!id_user) id_user = this.sharedUserService.getUserId();
    return this.http.delete<{ ok: boolean }>(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/despachos/' + id_office + '/partners/' + id_user + (forced_exit ? ('?force=' + forced_exit) : ""),
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }
    ).pipe(catchError(this.handleError.handleError));
  }
  findOffices(name?: string, strict?: boolean): Observable<IDespacho[]> {
    return this.http.get(this.BASE_URL + '/despachos?nombre=' + name + '&strict=' + strict).pipe(
      map(this.parseDespachos),
      catchError(this.handleError.handleError), )
  }
  findOffice(id: number): Observable<IDespacho> {
    return this.http.get(this.BASE_URL + '/despachos/' + id).pipe(
      map(this.parseDespacho),
      catchError(this.handleError.handleError), );
  }
  updateOffice(office: any): Observable<IDespacho> {
    return this.http.put(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/despachos/' + office.id,
      office,
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }
    ).pipe(
      map(this.parseDespacho),
      catchError(this.handleError.handleError), );
  }
  createOffice(office: any): Observable<IDespacho> {
    return this.http.post<IDespacho>(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/despacho',
      office,
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }
    ).pipe(catchError(this.handleError.handleError));
  }
  deleteOffice(id: number): Observable<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/despachos/' + id,
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }
    ).pipe(
      tap(r => { }),
      catchError(this.handleError.handleError), );
  }
  modifyAdmin(id: number, idOffice: number, admin: number): Observable<IDespacho> {
    return this.http.put(this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/despachos/' + idOffice + '/partners/' + id + '/modifyadmin',
      { flag: admin },
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.sharedUserService.getToken()) }
    ).pipe(
      map(this.parseDespacho),
      catchError(this.handleError.handleError), );
  }
  uploadPhoto(photo: File, idOffice: number): Observable<IDespacho> {
    return Observable.create(observer => {
      const formData = new FormData();
      formData.append('file', photo);
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response))
            observer.complete()
          } else {
            observer.error(xhr.response)
          }
        }
      }
      xhr.open("POST", this.BASE_URL + '/users/' + this.sharedUserService.getUserId() + '/despachos/' + idOffice + '/photo', true);
      xhr.setRequestHeader('Authorization', 'Bearer ' + this.sharedUserService.getToken());
      xhr.send(formData)
    })
      .map(this.parseDespacho);
  }
  countDespachos = (): Observable<{ count: number }> => {
    return this.http.get<{ count: number }>(this.BASE_URL + '/count/offices').pipe(catchError(this.handleError.handleError));
  }

}
