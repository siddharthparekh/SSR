
import { catchError, share } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IUsuarioStorage } from '../_models/UsuarioStorage';
import { IExperiencia } from '../_models/Experiencia';
import { IEducacion } from '../_models/Educacion';
import { IDespacho } from '../_models/Despacho';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';

import { UtilFunctions } from './../_utils/utilFunctions';
import { IProfesional } from '../_models/Profesional';

@Injectable()
export class SharedUserService {
   private user: IUsuarioStorage;
   private token: string;
   private subject: Subject<boolean> = new Subject();
   isLogged$ = this.subject.asObservable().pipe(share());

   constructor(
      private http: HttpClient,
   ) {
      if (this.isLoggedIn()) {
         this.getCurrentUserInfo();
      }
   }
   setUserInfo(user: IUsuarioStorage, token: string) {
      this.user = user;
      this.token = token;
      localStorage.setItem('currentUser', JSON.stringify({ user: user, token: token }));
      this.updateLoginStatus();
   }
   setUsuario(user: IUsuarioStorage) {
      this.user = user;
      localStorage.setItem('currentUser', JSON.stringify({ user: user, token: this.getToken() }));
   }
   setDatosFacturacion(datosFacturacion) {
      this.user.DatosFacturaciones = datosFacturacion;
      this.setUsuario(this.user);
   }
   setUserExperience(experiencia: IExperiencia) {
      for (let i in this.user.Experiencia) {
         if (this.user.Experiencia[i].id === experiencia.id) {
            this.user.Experiencia[i] = experiencia;
         }
      }
      this.setUsuario(this.user);
   }
   setUserDespacho(despacho: IDespacho, idDespacho: number) {
      for (let i in this.user.Despachos) {
         if (this.user.Despachos[i].Despacho.id === idDespacho) {
            this.user.Despachos[i].Despacho = despacho;
         }
      }
      this.setUsuario(this.user);
   }
   removeUserExperience(id: number) {
      for (let i in this.user.Experiencia) {
         if (this.user.Experiencia[i].id === id) {
            this.user.Experiencia.splice(+i, 1);
         }
      }
      this.setUsuario(this.user);
   }
   removeUserDespacho(id: number) {
      for (let i in this.user.Despachos) {
         if (this.user.Despachos[i].Despacho.id === id) {
            this.user.Despachos.splice(+i, 1);
         }
      }
      this.setUsuario(this.user);
   }
   setUserEducation(education: IEducacion) {
      for (let i in this.user.Educacion) {
         if (this.user.Educacion[i].id === education.id) {
            this.user.Educacion[i] = education;
         }
      }
      this.setUsuario(this.user);
   }
   removeUserEducation(id: number) {
      for (let i in this.user.Educacion) {
         if (this.user.Educacion[i].id === id) {
            this.user.Educacion.splice(+i, 1);
         }
      }
      this.setUsuario(this.user);
   }
   logout(): void {
      this.user = null;
      this.token = null;
      localStorage.removeItem('currentUser');
      this.updateLoginStatus();
   }
   updateLoginStatus(): void {
      if (localStorage.getItem('currentUser')) {
         this.subject.next(true);
      } else {
         this.subject.next(false);
      }
   }
   private getCurrentUserInfo(): any {
      let info = JSON.parse(localStorage.getItem('currentUser'));
      this.user = info.user;
      this.token = info.token;
   }
   getUser(): IUsuarioStorage {
      return this.user;
   }
   getToken(): string {
      return this.token;
   }
   getAuthorizationHeader(): any {
      const header = this.token ?
         { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token) } : undefined;
      return header;
   }
   getUserId(): number {
      if (this.user && this.user.Estadisticas && this.user.Estadisticas.id)
         return this.user.Estadisticas.id;
      else if (this.user && this.user.id)
         return this.user.id;
      else
         return undefined;
   }
   getUserSolrId(): string {
      return this.user ? this.user.Estadisticas.idSolr : undefined;
   }
   getUserTipo(): number {
      return this.user ? this.user.tipo : undefined;
   }
   // getUserDerechos() {
   //   if (this.user) {
   //     return this.user.Derechos ? this.user.Derechos : undefined;
   //   }
   //   else return undefined;
   // }
   isLoggedIn() {
      if (localStorage.getItem('currentUser')) {
         return true;
      } else {
         return false;
      }
   }
   getProfileUrl(user: IProfesional, isAnonimo?: boolean, plainUser?: { userName?: string, userId: number }): string[] {
      let arrayUrl: string[];
      if (!isAnonimo) {
         if (plainUser && plainUser.userName && plainUser.userId)
            arrayUrl = ['abogado', `${this.formatUrlString(plainUser.userName)}-${plainUser.userId}`];
         else if (user && user.Estadisticas && user.Estadisticas.nombre && user.Estadisticas.id)
            arrayUrl = ['abogado', `${this.formatUrlString(user.Estadisticas.nombre)}-${user.Estadisticas.id}`];
         else throw new Error("Datos necesarios para url no encontrados");
      } else {
         if (plainUser.userId)
            arrayUrl = ['abogado', `${plainUser.userId}`];
         else if (user.Estadisticas && user.Estadisticas.anonymous_id)
            arrayUrl = ['abogado', user.Estadisticas.anonymous_id];
         else throw new Error("Datos necesarios para url no encontrados");
      }
      return arrayUrl;
   }

   formatUrlString(nombre: string): string {
      if (!nombre) return undefined;
      nombre = UtilFunctions.removeDiacritics(nombre);
      return nombre.replace(/ /g, '-').toLowerCase();
   }

   formatStringUrl(url: string): string {
      if (!url) return undefined;
      url = UtilFunctions.removeDiacritics(url);
      return url.replace(/-/g, ' ').toLowerCase();
   }

   updateConsultasStatus(value: boolean): void {
      this.user.consultas = value;
      this.setUsuario(this.user);
   }

}
