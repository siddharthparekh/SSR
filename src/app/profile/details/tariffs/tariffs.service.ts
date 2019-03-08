import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProfileMode, AccessMode, AccessLevel } from '../../interfaces/profile-mode';
import { TariffsData, TariffsGroup, TariffsItem } from './interfaces';
import { testTariffsGroup1, testTariffsGroup2 } from './test-data';
import { environment } from '../../../../environments/environment';
import { capitalize } from '../../utils/capitalize';
import { parseAccessLevel } from '../../utils/parse-access-level';
import { SharedUserService } from '../../../_services/shared-user.service';

// for testing purposes
function parseTestTariffsData(accessMode: AccessMode) {
   return function (): TariffsData {
      return {
         groups: [testTariffsGroup1, testTariffsGroup2],
         access: {
            mode: accessMode,
            level: AccessLevel.None,
         },
      };
   }
}

function parseTariffsData(accessMode: AccessMode) {
   return function (rawData: any): TariffsData {
      const group: TariffsGroup = {
         name: 'Consultas Online',
         items: parseTariffsItems(rawData.data),
      };
      return {
         groups: [group],
         access: {
            mode: accessMode,
            level: parseAccessLevel(rawData.access as number),
         },
      };
   }
}

function parseTariffsItems(rawItems: any[]): TariffsItem[] {
   return rawItems.map(x => ({
      title: capitalize(x.nombre),
      price: x.precio,
   }));
}

@Injectable()
export class TariffsService {
   private BASE_URL = environment.api_url;

   constructor(private httpClient: HttpClient
      , private sharedUserService: SharedUserService) { }

   getTariffs(mode: ProfileMode, productoEjemplo?: string): Observable<TariffsData> {
      const header = this.sharedUserService.getAuthorizationHeader() || {};
      const url = this.BASE_URL +
         `/users/${mode.identifier}` +
         '/categoriasrespuestas' +
         (productoEjemplo ? `?p=${productoEjemplo}` : ``);

      return this.httpClient.get(url, header).map(parseTariffsData(mode.accessMode));
      // for testing purposes
      //return Observable.of(null).map(parseTestTariffsData(mode.accessMode)).delay(1000);
   }
}
