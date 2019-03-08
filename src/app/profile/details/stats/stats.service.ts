import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ProfileMode, AccessMode, AccessLevel } from '../../interfaces/profile-mode';
import {
   StatsData, ClientsData, GlobalEvolutionItem, SpecHeaderData, LawArea, LocalizacionItem,
} from './interfaces';
import {
   testLawAreas, testClientsData, testFeaturedAreas, testEvolutionData, testSpecialities, testLocalizacionesData,
} from './test-data';
import { parseAccessLevel } from '../../utils/parse-access-level';
import { SharedUserService } from '../../../_services/shared-user.service';

// for testing purposes
function parseTestStatsData(accessMode: AccessMode) {
   return function (): StatsData {
      return {
         irjValue: 78,
         yearsOfXp: 11,
         casesAnalyzed: 97,
         //casesEstimated: 118,
         lawAreas: testLawAreas,
         clientsData: testClientsData,
         evolutionData: testEvolutionData,
         specialities: testSpecialities,
         featuredAreas: testFeaturedAreas,
         localizacionesData: testLocalizacionesData,
         access: {
            mode: accessMode,
            level: AccessLevel.None,
         },
      }
   }
}

function parseStatsData(accessMode: AccessMode) {
   return function (rawData: any): StatsData {
      const innerData: any = rawData.data;
      const profStats = innerData.ProfesionalesEstadisticas;
      const rawStats = innerData.Estadisticas;
      const statsData: StatsData = {
         irjValue: profStats.rating,
         yearsOfXp: profStats.antiguedad,
         casesAnalyzed: profStats.numeroResoluciones,
         lawAreas: parseLawAreas(rawStats.areas),
         clientsData: parseClientsData(rawStats.clientes),
         evolutionData: parseEvolutionData(rawStats),
         specialities: parseSpecs(innerData.Derechos.especialidades),
         featuredAreas: parseSpecs(innerData.Derechos.areas_destacadas),
         localizacionesData: parseLocs(innerData.Estadisticas.localizaciones),
         access: {
            mode: accessMode,
            level: parseAccessLevel(rawData.access as number),
         },
      }
      return statsData;
   }
}

function parseLawAreas(rawAreas: any[]): LawArea[] {
   return rawAreas.map(x => ({
      name: x.nombre,
      solutions: x.resoluciones,
      media: x.media || 0,
   }));
}

function parseClientsData(rawClientesData: any[]): ClientsData {
   const di = rawClientesData ? rawClientesData.find(x => {
      return x.perfilCliente === 'PERSONA FÍSICA'
         && x.posicionProcesal === 'DEMANDADO';
   }) : null;
   const dc = rawClientesData ? rawClientesData.find(x => {
      return x.perfilCliente === 'PERSONA JURÍDICA'
         && x.posicionProcesal === 'DEMANDADO';
   }) : null;
   const ai = rawClientesData ? rawClientesData.find(x => {
      return x.perfilCliente === 'PERSONA FÍSICA'
         && x.posicionProcesal === 'DEMANDANTE';
   }) : null;
   const ac = rawClientesData ? rawClientesData.find(x => {
      return x.perfilCliente === 'PERSONA JURÍDICA'
         && x.posicionProcesal === 'DEMANDANTE';
   }) : null;
   const data: ClientsData = {
      demanded: {
         individual: !!di ? di.resoluciones : 0,
         company: !!dc ? dc.resoluciones : 0,
      },
      demanding: {
         individual: !!ai ? ai.resoluciones : 0,
         company: !!ac ? ac.resoluciones : 0,
      },
   };
   return data;
}

function parseEvolutionData(rawStatsData: any): GlobalEvolutionItem[] {
   const rawEvols: any[] = rawStatsData.evolucion;
   const rawResults: any[] = rawStatsData.resultados;
   const items: GlobalEvolutionItem[] = [];
   for (const rawEvol of rawEvols) {
      const year = rawEvol.year;
      const rawRes = rawResults.find(x => x.year === year);
      const item: GlobalEvolutionItem = {
         year,
         cases: rawEvol.resoluciones,
         results: !!rawRes ? +rawRes.tasaExito : 0,
      };
      items.push(item);
   }
   return items;
}

function parseSpecs(rawSpecs: any[]): SpecHeaderData[] {
   const items: SpecHeaderData[] = [];
   for (const rawSpec of rawSpecs) {
      const item: SpecHeaderData = {
         id: rawSpec.id,
         name: capitalize(rawSpec.nombre),
         irjValue: rawSpec.rating,
         access: {
            level: AccessLevel.Advanced,
            mode: AccessMode.Directory
         }
      }
      items.push(item);
   }
   return items;
}

function parseLocs(rawLocs: any[]): LocalizacionItem[] {
   const items: LocalizacionItem[] = [];
   for (const rawLoc of rawLocs) {
      const item: LocalizacionItem = {
         lat: rawLoc.lat,
         lon: rawLoc.lon,
         strokecolor: '#F27760',
         strokeopacity: rawLoc.resoluciones > 100 ? 0.2 : rawLoc.resoluciones > 10 ? 0.4 : 0.7,
         strokeweight: 1,
         fillcolor: '#F27760',
         fillopacity: rawLoc.resoluciones > 100 ? 0.2 : rawLoc.resoluciones > 10 ? 0.4 : 0.7,
         resoluciones: rawLoc.resoluciones,
         // radius: rawLoc.resoluciones > 100 ? rawLoc.resoluciones * 10 : rawLoc.resoluciones > 10 ? rawLoc.resoluciones * 500 : rawLoc.resoluciones * 1000,
         // radius: rawLoc.resoluciones * 500,
         radius: Math.sqrt(rawLoc.resoluciones * 500) * 100,
         // resoluciones: rawLoc.resoluciones * 1000,
         localizacion: rawLoc.localizacion,
         nombre: rawLoc.nombre,
      }
      items.push(item);
   }
   return items;
}

function capitalize(str: string): string {
   if (!str) return;
   const _str = str.toLowerCase();
   return _str.charAt(0).toUpperCase() + _str.slice(1);
}

@Injectable()
export class StatsService {
   private BASE_URL = environment.api_url;

   constructor(private httpClient: HttpClient,
      private sharedUserService: SharedUserService) { }

   getStatsData(mode: ProfileMode, productExampleEsencial?: string): Observable<HttpResponse<StatsData>> {
      const headers = this.sharedUserService.getAuthorizationHeader() || {};
      let url = this.BASE_URL
         + `/users/${mode.identifier}`;
      //  + '?models=EstadisticasGlobales'
      //  + '&models=ProfesionalesEstadisticas'
      //  + '&models=Derechos';
      if (productExampleEsencial) url = url.concat(`?p=${productExampleEsencial}`);
      return this.httpClient.get<HttpResponse<StatsData>>(url, { ...headers, observe: "response" })
         .map((data: any) => {
            let body = data.body;
            if (!body.privacy.profile) {
               body = parseStatsData(mode.accessMode)(body);
               data.body = body;
               return data;
            }
            else {
               body = parseTestStatsData(mode.accessMode)();
               data.body = body;
               return data;
            }
         });

      // for testing purposes
      //return Observable.of(null).map(parseTestStatsData(mode.accessMode)).delay(1000);
   }
}
