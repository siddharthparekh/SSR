import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IRespuestaLegal } from './../../_models/RespuestaLegal';


@Injectable()
export class SharedModalResponseService {
   private respuestaLegal: IRespuestaLegal;
   private paymentInfo: any;
   private htmlResponse: string;
   private categoria: number;
   private presupuesto: File;
   private onResolveResponse$: Subject<string> = new Subject<string>();
   destinatarioId: number;

   constructor() { }

   emitResolveResponse = (msg) => {
      this.onResolveResponse$.next(msg);
   }

   onResolveResponse = (): Observable<string> => {
      return this.onResolveResponse$.asObservable();
   }
   setPaymentInfo = (paymentInfo: any) => {
      this.paymentInfo = paymentInfo;
   }
   getPaymentInfo = () => {
      return this.paymentInfo;
   }
   setResponseClient = (response: IRespuestaLegal) => {
      this.respuestaLegal = response;
   }
   getResponseClient = (): IRespuestaLegal => {
      return this.respuestaLegal;
   }
   setHtmlResponse = (text: string) => {
      this.htmlResponse = text;
   }
   getHtmlResponse = (): string => {
      return this.htmlResponse;
   }
   setCategoria = (categoriaId: number) => {
      this.categoria = categoriaId;
   }
   getCategoria = (): number => {
      return this.categoria;
   }
   setPresupuesto = (p: File) => {
      this.presupuesto = p;
   }
   getResponse = (): any => {
      return {
         htmlResponse: this.htmlResponse,
         categoria: this.categoria,
         presupuesto: this.presupuesto
      }
   }

}
