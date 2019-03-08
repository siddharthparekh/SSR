import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { environment } from '../../../../environments/environment';
import { ProfileMode, AccessMode, AccessLevel } from '../../interfaces/profile-mode';
import {
   AboutData, CareerItem, FormationItem, LawyerAgency, LawyerLocation, PersonalInfo, Right,
} from './interfaces';
import { testAboutMeText, testCareerItem, testFormationItem, testLawyerAgency, testArticlesItem, testNewsItem } from './test-data';
import { parseAccessLevel } from '../../utils/parse-access-level';
import { SharedUserService } from '../../../_services/shared-user.service';
import { CapitalizePipe } from '../../../_pipes/capitalize.pipe';

// for testing purposes
function parseTestAboutData(mode: AccessMode) {
   return function (): AboutData {
      return {
         aboutMeText: testAboutMeText,
         agencies: [testLawyerAgency, testLawyerAgency],
         languages: [],
         careerItems: [testCareerItem, testCareerItem],
         formationItems: [testFormationItem],
         articlesItems: [testArticlesItem],
         newsItems: [testNewsItem],
         access: {
            mode,
            level: AccessLevel.None,
         },
      };
   }
}

function parseAboutData(accessMode: AccessMode) {
   return function (rawData: any): AboutData {
      const data: AboutData = {
         aboutMeText: parseAboutMe(rawData.data),
         agencies: parseLawyerAgencies(rawData.data.Despachos),
         languages: [],
         careerItems: parseCareerItems(rawData.data.Experiencia),
         formationItems: parseFormationItems(rawData.data.Educacion),
         articlesItems: [],
         newsItems: [],
         access: {
            mode: accessMode,
            level: parseAccessLevel(rawData.access),
         },
      };
      return data;
   }
}

function capitalize(value: string) {
   if (value) {
      value = value.toLocaleLowerCase();
      var res = "";
      var arr = value.split(" ");
      for (let i of arr) {
         res += i.charAt(0).toUpperCase() + i.slice(1) + " ";
      }
      return res;
   }
   return '';
}

function parseAboutMe(rawData: any): string {
   if (!rawData) return;

   if (rawData.presentation_text) return rawData.presentation_text;

   if (rawData.Colegios && rawData.Colegios.length > 0 && rawData.Colegios[0].ProfesionalesColegios) {
      var college = rawData.Colegios[0].nombre;
      var n_collegial = rawData.Colegios[0].ProfesionalesColegios.n_colegiado;
   }
   const nombre = rawData.ProfesionalesEstadisticas.nombre;
   const antiguedad = rawData.ProfesionalesEstadisticas.antiguedad;
   const comunity = rawData.ProfesionalesEstadisticas.comunidad;
   const locality = rawData.localidad;
   const address = rawData.domicilio;
   const provincy = rawData.ProfesionalesEstadisticas.provincia;
   const irj = rawData.Derechos.principales[0].rating;
   const rightName = rawData.Derechos.principales[0].nombre;

   const text = `${capitalize(nombre)}, abogado colegiado ${n_collegial} del Colegio de abogados de ${capitalize(college)} cuenta con ${antiguedad} años de experiencia como letrado en activo.<br>
   Presta servicios legales principalmente en la comunidad de ${comunity}, teniendo su domicilio profesional en ${address}, ${capitalize(locality)}, ${capitalize(provincy)}. <br>			         
   El análisis de su trayectoria por Emérita Legal lo ha identificado como uno de los mejores abogados especialistas en ${rightName} contando con una calificación de ${irj.toFixed()} en esta materia.`;
   return text;
}

function parseLawyerAgencies(rawAgencies: any[]): LawyerAgency[] {
   if (!rawAgencies) return [];
   const agencies: LawyerAgency[] = [];
   for (const rawAgency of rawAgencies) {
      agencies.push(parseLawyerAgency(rawAgency));
   }
   return agencies;
}
function parseLawyerAgency(rawAgency: any): LawyerAgency {
   if (!rawAgency) return undefined;
   const agency: LawyerAgency = {
      id: rawAgency.id,
      name: rawAgency.nombre,
      summaryText: rawAgency.presentation_text,
      adminLevel: rawAgency.ProfesionalesDespachos && rawAgency.ProfesionalesDespachos.is_admin,
      photo: rawAgency.foto
   };
   return agency;
}
export function parseCarrerItem(rawItem: any): CareerItem {
   return {
      id: rawItem.id,
      post: rawItem.cargo,
      agency: parseLawyerAgency(rawItem.Despacho) || { name: rawItem.empresa, id: null },
      from: new Date(rawItem.periodo_start),
      to: rawItem.periodo_end ? new Date(rawItem.periodo_end) : null,
      location: rawItem.ubicacion,
      summaryText: rawItem.descripcion,
   };
}
function parseCareerItems(experienciaItems: any[]): CareerItem[] {
   if (!experienciaItems) return [];
   const careerItems: CareerItem[] = [];
   for (const rawItem of experienciaItems) {
      careerItems.push(parseCarrerItem(rawItem));
   }
   return careerItems;
}

function parseFormationItems(educacionItems: any[]): FormationItem[] {
   if (!educacionItems) return [];
   const formationItems: FormationItem[] = [];
   for (const rawItem of educacionItems) {
      const item: FormationItem = {
         id: rawItem.id,
         institution: rawItem.institucion,
         certification: rawItem.titulacion,
         from: new Date(rawItem.periodo_start),
         to: rawItem.periodo_end ? new Date(rawItem.periodo_end) : null,
      };
      formationItems.push(item);
   }
   return formationItems;
}


@Injectable()
export class AboutService {
   private BASE_URL = environment.api_url;

   constructor(
      private httpClient: HttpClient,
      private sharedUserService: SharedUserService
   ) { }

   getAboutData(mode: ProfileMode): Observable<HttpResponse<AboutData>> {
      const headers = this.sharedUserService.getAuthorizationHeader() || {};
      const url = this.BASE_URL
         + `/users/${mode.identifier}`
         + '?models=Experiencia'
         + '&models=Educacion'
         + '&models=Profesionales'
         + '&models=Colegios'
         + '&models=Derechos'
         + '&models=Despachos';
      return this.httpClient.get<HttpResponse<AboutData>>(url, { ...headers, observe: "response" })
         .map((data: any) => {
            const body = parseAboutData(mode.accessMode)(data.body);
            data.body = body;
            return data;
         });

      // for testing purposes
      //return Observable.of(null).map(parseTestAboutData(mode.accessMode)).delay(1000);
   }
}
