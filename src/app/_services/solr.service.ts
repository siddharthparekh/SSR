
import {of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HandleError } from '../_utils/handleError';

@Injectable()
export class SolrService {

  constructor(private handleError: HandleError, private http: HttpClient) { }

  findUsersAutocomplete = (termino: string): Observable<any[]> => {
    return Observable.create(observer => {
      $.ajax({
        url: environment.autocomplete_url + '/autocompletado/autocompletado',
        jsonpCallback: "autocomplete",
        dataType: "jsonp",
        data: {
          q: termino,
          fq: 'ejerciente:true'
        },
        success: function(response) {
          observer.next(response);
          observer.complete();
        },
        error: function(err) {
          observer.error(err);
        }
      });
    })
  }
  getStructuredSentece = (text: string): Observable<any> => {
    return Observable.create(observer => {
      $.ajax({
        type: "POST",
        url: environment.autocomplete_url + "/magic/judgment-annotator",
        dataType: "json",
        data: {
          text: text,
          mode: 'json'
        },
        success: function(response) {
          observer.next(response);
          observer.complete();
        },
        error: function(err) {
          observer.error(err);
        }
      });
    })
  }
  findUsersByDistance = (): Observable<any> => {
      // return Observable.create(observer => {
      //   $.get({
      //     url:'http://emerita.blobee.com/solr/abogados/select?q=*&fq=%7B!geofilt%20sfield=cplocation%7D&pt=43.4868085,-8.2310351&d=5&facet=true&facet.field=direccionCP&wt=json',
      //     dataType: "json",
      //     success: function(response) {
      //       observer.next(response);
      //       observer.complete();
      //     },
      //     error: function(err) {
      //       observer.error(err);
      //     }
      //   });
      // })
      let json = '{\"responseHeader\":{\"status\":0,\"QTime\":1,\"params\":{\"q\":\"*\",\"facet.field\":\"direccionCP\",\"pt\":\"43.4868085,-8.2310351\",\"d\":\"5\",\"fq\":\"{!geofilt sfield=cplocation}\",\"facet\":\"true\",\"wt\":\"json\"}},\"response\":{\"numFound\":295,\"start\":0,\"docs\":[{\"id\":\"MADRID-30512\",\"name\":\"AQUILINO YA\u00D1EZ DE ANDRES\",\"name_s\":\"AQUILINO YA\u00D1EZ DE ANDRES\",\"alternative_names\":\"YA\u00D1EZ DE ANDRES AQUILINO\",\"nombre\":\"AQUILINO\",\"apellidos\":\"YA\u00D1EZ DE ANDRES\",\"colegio\":\"MADRID\",\"ncolegiado\":\"30512\",\"residente\":\"true\",\"ejerciente\":\"true\",\"telefono\":\"981358811\",\"fax\":\"981358787\",\"direccionCalle\":\"Manuel de Cal, 4, entr. Edf. Alameda. Cant\u00F3n\",\"direccionLocalidad\":\"Ferrol\",\"direccionProvincia\":\"CORU\u00D1A, A\",\"direccionPais\":\"ESPA\u00D1A\",\"direccionPais_facet\":[\"ESPA\u00D1A\"],\"direccionCP\":\"15403\",\"altaColegiacion\":\"1987-11-24T00:00:00Z\",\"fechaActualizacion\":\"2017-10-23T00:00:00Z\",\"cplocation\":\"43.4830933,-8.2240321\",\"_version_\":1582113332814413824,\"fechaindex\":\"2017-10-24T04:52:56.119Z\"},{\"id\":\"A CORU\u00D1A-4403\",\"name\":\"MARIA AGRA LOPEZ\",\"name_s\":\"MARIA AGRA LOPEZ\",\"alternative_names\":\"AGRA LOPEZ MARIA\",\"nombre\":\"MARIA\",\"apellidos\":\"AGRA LOPEZ\",\"colegio\":\"A CORU\u00D1A\",\"ncolegiado\":\"4403\",\"residente\":\"true\",\"ejerciente\":\"true\",\"telefono\":\"666261402\",\"direccionCalle\":\"C\/Real  N\u00BA 53,  1\u00BA\",\"direccionLocalidad\":\"Ferrol\",\"direccionProvincia\":\"CORU\u00D1A, A\",\"direccionPais\":\"ESPA\u00D1A\",\"direccionPais_facet\":[\"ESPA\u00D1A\"],\"direccionCP\":\"15402\",\"altaColegiacion\":\"2007-05-10T00:00:00Z\",\"fechaActualizacion\":\"2017-10-23T00:00:00Z\",\"cplocation\":\"43.4854405,-8.2329191\",\"_version_\":1582113449744269312,\"fechaindex\":\"2017-10-24T04:56:02.629Z\"},{\"id\":\"A CORU\u00D1A-622\",\"name\":\"RAMON ARTIME COT\",\"name_s\":\"RAMON ARTIME COT\",\"alternative_names\":\"ARTIME COT RAMON\",\"nombre\":\"RAMON\",\"apellidos\":\"ARTIME COT\",\"colegio\":\"A CORU\u00D1A\",\"ncolegiado\":\"622\",\"residente\":\"true\",\"ejerciente\":\"true\",\"telefono\":\"981359695\",\"fax\":\"981355854\",\"direccionCalle\":\"Tierra, 9 - 4\u00BA.\",\"direccionLocalidad\":\"Ferrol\",\"direccionProvincia\":\"CORU\u00D1A, A\",\"direccionPais\":\"ESPA\u00D1A\",\"direccionPais_facet\":[\"ESPA\u00D1A\"],\"direccionCP\":\"15402\",\"altaColegiacion\":\"1980-02-11T00:00:00Z\",\"fechaActualizacion\":\"2017-10-23T00:00:00Z\",\"cplocation\":\"43.4854405,-8.2329191\",\"_version_\":1582113449935110145,\"fechaindex\":\"2017-10-24T04:56:02.629Z\"},{\"id\":\"A CORU\u00D1A-1725\",\"name\":\"FERNANDO BARRO SABIN\",\"name_s\":\"FERNANDO BARRO SABIN\",\"alternative_names\":\"BARRO SABIN FERNANDO\",\"nombre\":\"FERNANDO\",\"apellidos\":\"BARRO SABIN\",\"colegio\":\"A CORU\u00D1A\",\"ncolegiado\":\"1725\",\"residente\":\"true\",\"ejerciente\":\"true\",\"telefono\":\"981370304\",\"fax\":\"981370360\",\"direccionCalle\":\"Pl. de Ultramar, 1 y 2, entresuelo, B.\",\"direccionLocalidad\":\"Ferrol\",\"direccionProvincia\":\"CORU\u00D1A, A\",\"direccionPais\":\"ESPA\u00D1A\",\"direccionPais_facet\":[\"ESPA\u00D1A\"],\"direccionCP\":\"15404\",\"altaColegiacion\":\"1992-02-17T00:00:00Z\",\"fechaActualizacion\":\"2017-10-23T00:00:00Z\",\"cplocation\":\"43.4886641,-8.2130958\",\"_version_\":1582113449996976128,\"fechaindex\":\"2017-10-24T04:56:02.629Z\"},{\"id\":\"A CORU\u00D1A-911\",\"name\":\"MANUEL CASAL FRAGA\",\"name_s\":\"MANUEL CASAL FRAGA\",\"alternative_names\":\"CASAL FRAGA MANUEL\",\"nombre\":\"MANUEL\",\"apellidos\":\"CASAL FRAGA\",\"colegio\":\"A CORU\u00D1A\",\"ncolegiado\":\"911\",\"residente\":\"true\",\"ejerciente\":\"true\",\"telefono\":\"981311988\",\"fax\":\"981312014\",\"direccionCalle\":\"Avda. do Rei, 100\",\"direccionLocalidad\":\"Ferrol\",\"direccionProvincia\":\"CORU\u00D1A, A\",\"direccionPais\":\"ESPA\u00D1A\",\"direccionPais_facet\":[\"ESPA\u00D1A\"],\"direccionCP\":\"15402\",\"altaColegiacion\":\"1986-02-03T00:00:00Z\",\"fechaActualizacion\":\"2017-10-23T00:00:00Z\",\"cplocation\":\"43.4854405,-8.2329191\",\"_version_\":1582113450251780096,\"fechaindex\":\"2017-10-24T04:56:02.629Z\"},{\"id\":\"A CORU\u00D1A-1162\",\"name\":\"MARCELO CRESPO LOPEZ\",\"name_s\":\"MARCELO CRESPO LOPEZ\",\"alternative_names\":\"CRESPO LOPEZ MARCELO\",\"nombre\":\"MARCELO\",\"apellidos\":\"CRESPO LOPEZ\",\"colegio\":\"A CORU\u00D1A\",\"ncolegiado\":\"1162\",\"residente\":\"true\",\"ejerciente\":\"true\",\"telefono\":\"981352260\",\"fax\":\"981352260\",\"direccionCalle\":\"Real, 196-entresuelo\",\"direccionLocalidad\":\"Ferrol\",\"direccionProvincia\":\"CORU\u00D1A, A\",\"direccionPais\":\"ESPA\u00D1A\",\"direccionPais_facet\":[\"ESPA\u00D1A\"],\"direccionCP\":\"15401\",\"altaColegiacion\":\"1988-10-26T00:00:00Z\",\"fechaActualizacion\":\"2017-10-23T00:00:00Z\",\"cplocation\":\"43.4851980,-8.2445422\",\"_version_\":1582113450391240705,\"fechaindex\":\"2017-10-24T04:56:02.629Z\"},{\"id\":\"A CORU\u00D1A-336\",\"name\":\"JAIME DAPENA FERNANDEZ\",\"name_s\":\"JAIME DAPENA FERNANDEZ\",\"alternative_names\":\"DAPENA FERNANDEZ JAIME\",\"nombre\":\"JAIME\",\"apellidos\":\"DAPENA FERNANDEZ\",\"colegio\":\"A CORU\u00D1A\",\"ncolegiado\":\"336\",\"residente\":\"true\",\"ejerciente\":\"true\",\"telefono\":\"981320959\",\"fax\":\"981317677\",\"direccionCalle\":\"Real, 1-3\u00BA puerta M, Izda.\",\"direccionLocalidad\":\"Ferrol\",\"direccionProvincia\":\"CORU\u00D1A, A\",\"direccionPais\":\"ESPA\u00D1A\",\"direccionPais_facet\":[\"ESPA\u00D1A\"],\"direccionCP\":\"15402\",\"altaColegiacion\":\"1969-03-26T00:00:00Z\",\"fechaActualizacion\":\"2017-10-23T00:00:00Z\",\"cplocation\":\"43.4854405,-8.2329191\",\"_version_\":1582113450413260800,\"fechaindex\":\"2017-10-24T04:56:02.629Z\"},{\"id\":\"A CORU\u00D1A-767\",\"name\":\"SOFIA GENOVEVA FRIEIRO LOPEZ\",\"name_s\":\"SOFIA GENOVEVA FRIEIRO LOPEZ\",\"alternative_names\":\"FRIEIRO LOPEZ SOFIA GENOVEVA\",\"nombre\":\"SOFIA GENOVEVA\",\"apellidos\":\"FRIEIRO LOPEZ\",\"colegio\":\"A CORU\u00D1A\",\"ncolegiado\":\"767\",\"residente\":\"true\",\"ejerciente\":\"true\",\"telefono\":\"981358284\",\"fax\":\"981358424\",\"direccionCalle\":\"Lugo, 63-65-entresuelo\",\"direccionLocalidad\":\"Ferrol\",\"direccionProvincia\":\"CORU\u00D1A, A\",\"direccionPais\":\"ESPA\u00D1A\",\"direccionPais_facet\":[\"ESPA\u00D1A\"],\"direccionCP\":\"15402\",\"altaColegiacion\":\"1983-09-16T00:00:00Z\",\"fechaActualizacion\":\"2017-10-23T00:00:00Z\",\"cplocation\":\"43.4854405,-8.2329191\",\"_version_\":1582113450833739776,\"fechaindex\":\"2017-10-24T04:56:02.629Z\"},{\"id\":\"A CORU\u00D1A-3642\",\"name\":\"OSCAR JOSE PAMPIN RODRIGUEZ\",\"name_s\":\"OSCAR JOSE PAMPIN RODRIGUEZ\",\"alternative_names\":\"PAMPIN RODRIGUEZ OSCAR JOSE\",\"nombre\":\"OSCAR JOSE\",\"apellidos\":\"PAMPIN RODRIGUEZ\",\"colegio\":\"A CORU\u00D1A\",\"ncolegiado\":\"3642\",\"residente\":\"true\",\"ejerciente\":\"true\",\"telefono\":\"981319799\",\"fax\":\"981319296\",\"direccionCalle\":\"Fontai\u00F1a, 5-7-bajo dcha.\",\"direccionLocalidad\":\"Ferrol\",\"direccionProvincia\":\"CORU\u00D1A, A\",\"direccionPais\":\"ESPA\u00D1A\",\"direccionPais_facet\":[\"ESPA\u00D1A\"],\"direccionCP\":\"15404\",\"altaColegiacion\":\"2000-05-08T00:00:00Z\",\"fechaActualizacion\":\"2017-10-23T00:00:00Z\",\"cplocation\":\"43.4886641,-8.2130958\",\"_version_\":1582113452002902016,\"fechaindex\":\"2017-10-24T04:56:02.629Z\"},{\"id\":\"A CORU\u00D1A-810\",\"name\":\"RICARDO MIGUEL PEREZ LAMA\",\"name_s\":\"RICARDO MIGUEL PEREZ LAMA\",\"alternative_names\":\"PEREZ LAMA RICARDO MIGUEL\",\"nombre\":\"RICARDO MIGUEL\",\"apellidos\":\"PEREZ LAMA\",\"colegio\":\"A CORU\u00D1A\",\"ncolegiado\":\"810\",\"residente\":\"true\",\"ejerciente\":\"true\",\"telefono\":\"981324300\",\"fax\":\"981328204\",\"direccionCalle\":\"Ctra. de Castilla, 80-A-entresuelo.\",\"direccionLocalidad\":\"Ferrol\",\"direccionProvincia\":\"CORU\u00D1A, A\",\"direccionPais\":\"ESPA\u00D1A\",\"direccionPais_facet\":[\"ESPA\u00D1A\"],\"direccionCP\":\"15404\",\"altaColegiacion\":\"1984-04-12T00:00:00Z\",\"fechaActualizacion\":\"2017-10-23T00:00:00Z\",\"cplocation\":\"43.4886641,-8.2130958\",\"_version_\":1582113452148654080,\"fechaindex\":\"2017-10-24T04:56:02.629Z\"}]},\"facet_counts\":{\"facet_queries\":{},\"facet_fields\":{\"direccionCP\":[\"15402\",128,\"15403\",58,\"15404\",47,\"15401\",34,\"15405\",9,\"15406\",8,\"15407\",5,\"15593\",4,\"15528\",1,\"15572\",1,\".\",0,\"0\",0,\"00---\",0,\"00000\",0,\"00002\",0,\"00007\",0,\"00010\",0,\"00012\",0,\"00013\",0,\"00014\",0,\"00015\",0,\"00017\",0,\"00019\",0,\"00021\",0,\"00023\",0,\"00024\",0,\"00025\",0,\"00026\",0,\"00028\",0,\"00030\",0,\"00034\",0,\"00035\",0,\"00036\",0,\"00037\",0,\"00040\",0,\"00041\",0,\"00043\",0,\"00046\",0,\"00048\",0,\"00049\",0,\"00050\",0,\"00053\",0,\"00055\",0,\"00058\",0,\"00059\",0,\"00062\",0,\"00063\",0,\"00071\",0,\"00100\",0,\"00103\",0,\"00113\",0,\"00115\",0,\"00118\",0,\"00121\",0,\"00122\",0,\"00123\",0,\"00124\",0,\"00125\",0,\"00126\",0,\"00127\",0,\"00128\",0,\"00129\",0,\"00130\",0,\"00131\",0,\"00132\",0,\"00133\",0,\"00135\",0,\"00136\",0,\"00137\",0,\"00138\",0,\"00139\",0,\"00141\",0,\"00142\",0,\"00143\",0,\"00144\",0,\"00145\",0,\"00146\",0,\"00147\",0,\"00148\",0,\"00149\",0,\"00151\",0,\"00152\",0,\"00153\",0,\"00154\",0,\"00155\",0,\"00156\",0,\"00159\",0,\"00161\",0,\"00162\",0,\"00163\",0,\"00164\",0,\"00165\",0,\"00166\",0,\"00167\",0,\"00168\",0,\"00169\",0,\"00171\",0,\"00172\",0,\"00173\",0,\"00174\",0]},\"facet_ranges\":{},\"facet_intervals\":{},\"facet_heatmaps\":{}}}'
      return observableOf(JSON.parse(json));
  }

}
