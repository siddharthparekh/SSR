import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ProfileMode } from '../../interfaces/profile-mode';
import { FeedbackItem } from './interfaces';
import { SharedUserService } from '../../../_services/shared-user.service';
import { capitalize } from '../../utils/capitalize';

const testFeedbackItemsBlank = [];
const testFeedbackItems: FeedbackItem[] = [
   {
      userName: null,
      isVerified: false,
      ratingAtencion: 5,
      ratingAsesoramiento: 5,
      ratingCalidad: 5,
      ratingAvg: 5,
      date: new Date(2018, 7, 15),
      comment: `
      Pellentesque habitant morbi tristique senectus et netus et 
      malesuada fames ac turpis egestas. Morbi tristique dictum 
      metus sit amet finibus. Pellentesque tempor maximus nulla 
      non eleifend.
    `,
   },
   {
      userName: null,
      isVerified: false,
      ratingAtencion: 5,
      ratingAsesoramiento: 5,
      ratingCalidad: 5,
      ratingAvg: 5,
      date: new Date(2018, 7, 15),
      comment: `
      Pellentesque habitant morbi tristique senectus et netus et 
      malesuada fames ac turpis egestas. Morbi tristique dictum 
      metus sit amet finibus. Pellentesque tempor maximus nulla 
      non eleifend.
    `,
   }, {
      userName: null,
      isVerified: false,
      ratingAtencion: 5,
      ratingAsesoramiento: 5,
      ratingCalidad: 5,
      ratingAvg: 5,
      date: new Date(2018, 7, 15),
      comment: `
      Pellentesque habitant morbi tristique senectus et netus et 
      malesuada fames ac turpis egestas. Morbi tristique dictum 
      metus sit amet finibus. Pellentesque tempor maximus nulla 
      non eleifend.
    `,
   },
];

function parseFeedbackItems(rawData: any): FeedbackItem[] {
   const items: FeedbackItem[] = [];
   const rawValoraciones = rawData && rawData.data && rawData.data.Valoraciones || [];
   for (const rawItem of rawValoraciones) {
      const item = parseFeedbackItem(rawItem);
      items.push(item);
   }
   return items;
}

function parseFeedbackItem(valoracionesItem: any): FeedbackItem {
   const remitente = (((valoracionesItem || {}).RespuestasLegale || {}).Mensaje || {}).Remitente;
   const userName = remitente && remitente.nombre ? capitalize(remitente.nombre) : undefined;

   const item: FeedbackItem = {
      userName,
      isVerified: true,
      ratingAsesoramiento: valoracionesItem.ratingAsesoramiento,
      ratingAtencion: valoracionesItem.ratingAtencion,
      ratingCalidad: valoracionesItem.ratingCalidadPrecio,
      ratingAvg: (valoracionesItem.ratingAsesoramiento + valoracionesItem.ratingAtencion + valoracionesItem.ratingCalidadPrecio) / 3,
      date: new Date(valoracionesItem.createdAt),
      comment: valoracionesItem.opinion,
   };
   return item;
}

@Injectable()
export class FeedbackService {
   private BASE_URL = environment.api_url;

   constructor(private httpClient: HttpClient
      , private sharedUserService: SharedUserService) { }

   getFeedbackItems(mode: ProfileMode): Observable<HttpResponse<FeedbackItem[]>> {
      const headers = this.sharedUserService.getAuthorizationHeader() || {};
      const url = this.BASE_URL
         + `/users/${mode.identifier}`
         + '?models=Valoraciones';
      return this.httpClient.get<HttpResponse<FeedbackItem[]>>(url, { ...headers, observe: "response" })
         .map((data: any) => {
            const body = parseFeedbackItems(data.body);
            data.body = body;
            return data;
         });
      //return Observable.of(testFeedbackItemsBlank).delay(1000);
      //return Observable.of(testFeedbackItems).delay(1000);
   }
}
