import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { environment } from '../../../environments/environment';
import { ProfileMode, AccessMode, AccessLevel } from '../interfaces/profile-mode';
import { NameData, ImageData, SpecsData, SummaryData, LocationData } from './interfaces';
import { testImageUrl, testFullName, testCollege, testSpecs } from './test-data';
import { parseAccessLevel } from '../utils/parse-access-level';
import { SharedUserService } from '../../_services/shared-user.service';
import { parsePrivacy } from '../utils/parse-privacy';
import { catchError, map } from 'rxjs/operators';
import { HandleError } from '../../_utils/handleError';

// for testing purposes
function parseTestSummaryData(accessMode: AccessMode) {
   return function (rawData: any): SummaryData {
      return {
         isExpertise: true,
         hasQueries: true,
         isRegistered: true,
         irjValue: 78,
         imageData: {
            imageUrl: testImageUrl,
         },
         nameData: {
            fullName: testFullName,
            college: testCollege,
            isExpertise: true,
            isSpecialist: true,
            urlName: testFullName
         },
         specsData: {
            isSpecialist: true,
            specs: testSpecs,
            //specs: [],
         },
         access: {
            mode: accessMode,
            level: AccessLevel.None,
         },
         privacy: parsePrivacy(rawData.privacy),
         position: 3,
         location: {
            comunity: "Galicia",
            province: "A Coruña",
            locality: "Santiago"
         }
      }
   }
}

function parseSummaryData(accessMode: AccessMode) {
   return function (rawData: any, formatUrlString): SummaryData {
      const usuario = rawData.data.Usuario;
      const colegios = rawData.data.Colegios;
      const profStats = rawData.data.ProfesionalesEstadisticas;

      const isExpertise: boolean = (profStats.tipo === 0);
      const isSpecialist: boolean = rawData.data.especialista;

      let fullName: string;
      let urlName: string;
      let imageUrl: string | null;
      if (!usuario) {
         fullName = testFullName;
         imageUrl = null;
         urlName = fullName;
      } else {
         fullName = usuario.nombre && usuario.apellidos ? `${usuario.nombre} ${usuario.apellidos}` : profStats.nombre;
         imageUrl = usuario.foto;
         urlName = formatUrlString(profStats.nombre);
      }

      let college;
      if (!colegios) {
         college = testCollege;
      } else {
         const colegio = colegios[0];
         college = `${colegio.ProfesionalesColegios.n_colegiado} ${colegio.nombre}`
      }

      const nameData: NameData = {
         fullName,
         college,
         isExpertise,
         isSpecialist,
         urlName
      }

      const specs: string[] = [];
      for (let derecho of rawData.data.Derechos.principales) {
         specs.push(derecho.nombre);
      }
      const specsData: SpecsData = {
         isSpecialist,
         specs: specs,
      }

      let position = rawData.data.Derechos.principales[0].posicion;

      const location: LocationData = {
         comunity: profStats.comunidad,
         province: profStats.provincia,
         locality: rawData.data.localidad
      }

      const data: SummaryData = {
         irjValue: profStats.rating,
         position,
         isExpertise,
         isRegistered: profStats.is_registered,
         hasQueries: rawData.data.consultas,
         imageData: { imageUrl },
         nameData,
         specsData,
         access: {
            mode: accessMode,
            level: parseAccessLevel(rawData.access as number),
         },
         privacy: parsePrivacy(rawData.privacy),
         location
      }
      return data;
   }
}

@Injectable()
export class SummaryService {
   private BASE_URL = environment.api_url;

   constructor(private httpClient: HttpClient,
      private handleError: HandleError,
      private sharedUserService: SharedUserService
   ) { }


   getSummaryData(mode: ProfileMode,
      derechoPrincipal?: string,
      alcance?: string,
      categoria?: string): Observable<HttpResponse<SummaryData>> {
      const headers = this.sharedUserService.getAuthorizationHeader() || {};
      derechoPrincipal = derechoPrincipal ? `&from=${derechoPrincipal}` : '';
      alcance = alcance ? `&a=${alcance}` : '';
      categoria = categoria ? `&c=${categoria}` : '';
      const url = this.BASE_URL
         + `/users/${mode.identifier}`
         + '?models=Usuarios'
         + '&models=Colegios'
         + '&models=ProfesionalesEstadisticas'
         + '&models=Derechos'
         + derechoPrincipal
         + alcance
         + categoria;

      return this.httpClient.get<HttpResponse<SummaryData>>(url, {
         ...headers,
         observe: "response"
      }).pipe(
         map((data: any) => {
            let body = data.body;
            if (!body.privacy.profile) {
               body = parseSummaryData(mode.accessMode)(body, this.sharedUserService.formatStringUrl);
               data.body = body;
               return data;
            }
            else {
               body = parseTestSummaryData(mode.accessMode)(body);
               data.body = body;
               return data;
            }
         }),
         catchError(this.handleError.handleError)
      );



      // for testing purposes
      //return Observable.of(null).map(parseTestSummaryData(mode.accessMode)).delay(1000);
   }
}
