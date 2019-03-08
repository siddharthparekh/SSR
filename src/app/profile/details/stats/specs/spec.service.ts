import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ContentData, RankingData, SubjectsDataItem, CasesData, SpecClientsData, SuccessRateData, LineChartItem } from './interfaces';
import {
   testRankingData, testSubjectsData, testCasesData, testClientsData,
   testSuccessRateData, testEvolutionCasesData, testResultsData,
} from './test-data';
import { capitalize } from '../../../utils/capitalize';
import { Access, AccessMode, AccessLevel } from '../../../interfaces/profile-mode';
import { SharedUserService } from '../../../../_services/shared-user.service';

// for testing purposes
function parseTestContentData(): ContentData {
   const testContentData: ContentData = {
      rankingData: testRankingData,
      subjectsData: testSubjectsData,
      //subjectsData: [],
      casesData: testCasesData,
      clientsData: testClientsData,
      successRateData: testSuccessRateData,
      evolutionCasesData: testEvolutionCasesData,
      //evolutionCasesData: [],
      resultsData: testResultsData,
      //resultsData: [],
   };
   return testContentData;
   //throw new Error();
}

function parseContentData(rawData: any): ContentData {
   const data: ContentData = {
      rankingData: parseRankingData(rawData.rankings),
      subjectsData: parseSubjectsDataItems(rawData.destacadas),
      casesData: parseCasesData(rawData.casos),
      clientsData: parseClientsData(rawData.clientes),
      successRateData: parseSuccessRateData(rawData.tasasExito),
      evolutionCasesData: parseEvolutionCasesData(rawData.evolucionCasos),
      resultsData: parseResultsData(rawData.evolucionResultados),
   };
   return data;
}

function parseRankingData(rawRankings: any): RankingData {
   return {
      placeNational: rawRankings.posicionNacionalCategoria,
      placeCommunity: rawRankings.posicionComunitariaCategoria,
      placeProvincial: rawRankings.posicionProvincialCategoria,
      nation: rawRankings.estado,
      comunity: rawRankings.comunidad,
      province: rawRankings.provincia,
      antiguedad: rawRankings.antiguedad
   };
}

function parseSubjectsDataItems(rawSubjects: any[]): SubjectsDataItem[] {
   if (rawSubjects.length === 0) {
      return [];
   } else {
      const items: SubjectsDataItem[] = [];
      for (const rawItem of rawSubjects) {
         const item: SubjectsDataItem = {
            name: capitalize(rawItem.nombre),
            children: parseSubjectsDataItems(rawItem.children),
         };
         items.push(item);
      }
      return items;
   }
}

function parseCasesData(rawCasesData: any): CasesData {
   return {
      analyzed: rawCasesData.resoluciones,
      media: rawCasesData.media,
   }
}

function parseClientsData(rawClientesData: any[]): SpecClientsData {
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
   const data: SpecClientsData = {
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

function parseSuccessRateData(rawSrData: any): SuccessRateData {
   const companyData = rawSrData.perfiles
      .find(x => x.perfil === 'PERSONA JURÍDICA');
   const individualData = rawSrData.perfiles
      .find(x => x.perfil === 'PERSONA FÍSICA');
   if (!companyData) return;
   return {
      simple: {
         value: rawSrData.tasaExito,
         mediaValue: rawSrData.tasaExitoPosible,
      },
      company: {
         value: companyData.tasaExito,
         mediaValue: companyData.tasaExitoPosible,
      },
      individual: {
         value: individualData.tasaExito,
         mediaValue: individualData.tasaExitoPosible,
      },
   }
}

function parseEvolutionCasesData(rawEcData: any[]): LineChartItem[] {
   return rawEcData.map(x => {return {
      year: x.year,
      global: x.resoluciones,
      media: x.media,
   }});
}

function parseResultsData(rawResultsData: any[]): LineChartItem[] {
   return rawResultsData.map(x => {return {
      year: x.year,
      global: x.tasaExito,
      media: x.media,
   }});
}

@Injectable()
export class SpecService {
   private BASE_URL = environment.api_url;

   constructor(
      private httpClient: HttpClient,
      private sharedUserService: SharedUserService
   ) { }



   getSpecContent(userIdentifier: number | string, specId: number, access: Access): Observable<ContentData> {
      const header = this.sharedUserService.getAuthorizationHeader() || {};
      let parser = parseContentData;
      if (!!access && access.mode === AccessMode.Directory) {
         if (access.level < AccessLevel.Advanced) {
            parser = parseTestContentData;
         }
      }
      const url = this.BASE_URL + `/users/${userIdentifier}/${specId}` + '/stats';

      return this.httpClient.get(url, header).map(parser);
      // for testing purposes
      //return Observable.of(null).map(parseTestContentData).delay(1000);
   }
}
