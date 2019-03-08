import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { environment } from '../../../../environments/environment';
import { ProfileMode, AccessMode, AccessLevel } from '../../interfaces/profile-mode';
import { ContactData } from './interfaces';
import { testAddress, testPhone, testEmail } from './test-data';
import { parseAccessLevel } from '../../utils/parse-access-level';
import { SharedUserService } from '../../../_services/shared-user.service';

// for testing purposes
function parseTestContactData(mode: AccessMode) {
   return function (): ContactData {
      return {
         address: testAddress,
         phone: testPhone,
         email: testEmail,
         access: {
            mode,
            level: AccessLevel.None,
         },
      };
   }
}

function parseContactData(mode: AccessMode) {
   return function (rawData: any): ContactData {
      const innerRawData = rawData.data;
      const email = innerRawData.Usuario && innerRawData.Usuario.email;
      const data: ContactData = {
         address: parseAddress(innerRawData),
         phone: innerRawData.telefono || null,
         email: email || null,
         access: {
            mode,
            level: parseAccessLevel(rawData.access),
         },
      }
      return data;
   }
}

function parseAddress(innerRawData: any): string {
   const partOne = innerRawData.domicilio || null;
   const zipCode = innerRawData.cp || null;
   const location = innerRawData.localidad || null;
   const partTwo = [zipCode, location].join(' ').trim();
   const separator = (!!partOne && !!partTwo) ? ', ' : '';
   return [partOne, separator, partTwo].join('');
}

@Injectable()
export class ContactService {
   private BASE_URL = environment.api_url;

   constructor(
      private httpClient: HttpClient,
      private sharedUserService: SharedUserService
   ) { }

   getContactData(mode: ProfileMode): Observable<HttpResponse<ContactData>> {
      const headers = this.sharedUserService.getAuthorizationHeader() || {};
      const url = this.BASE_URL
         + `/users/${mode.identifier}`
         + '?models=Usuarios'
         + '&models=Profesionales';
      return this.httpClient.get<HttpResponse<ContactData>>(url, { ...headers, observe: "response" })
         .map((data: any) => {
            const body = parseContactData(mode.accessMode)(data.body);
            data.body = body;
            return data;
         });

      // for testing purposes
      //return Observable.of([]).map(parseTestContactData(mode.accessMode)).delay(1000);
   }
}
