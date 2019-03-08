
import {catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { HandleError } from '../_utils/handleError';

@Injectable()
export class DataChartsService {

  private BASE_URL = environment.api_url;
  data = {};

  constructor(private handleError:HandleError, private http: HttpClient) {

   }

  //  Obtener datos de un abogado
  getData(){
    return this.data;
  }

  getNombreOrden(id:number){
    return this.http.get(this.BASE_URL + '/charts/orden/' + id).pipe(catchError(this.handleError.handleError));    
  }

  getProgCuant(id:number, derechoId:number){
    return this.http.get(this.BASE_URL + '/charts/cuant/' + id + "/" + derechoId).pipe(catchError(this.handleError.handleError));    
  }

  getProgCual(id:number, derechoId:number){
    return this.http.get(this.BASE_URL + '/charts/cual/' + id + "/" + derechoId).pipe(catchError(this.handleError.handleError));    
  }

  getDatosMediosDespacho(id: number){
    return this.http.get(this.BASE_URL + '/charts/despacho/' + id).pipe(catchError(this.handleError.handleError));
  }

  getProgCualDespacho(id:number, derechoId:number){
    return this.http.get(this.BASE_URL + '/charts/despacho/cual/' + id + "/" + derechoId).pipe(catchError(this.handleError.handleError));
  }

  getProgCuantDespacho(id:number, derechoId:number){
    return this.http.get(this.BASE_URL + '/charts/despacho/cuant/' + id + "/" + derechoId).pipe(catchError(this.handleError.handleError));    
  }

  // 
  
}
