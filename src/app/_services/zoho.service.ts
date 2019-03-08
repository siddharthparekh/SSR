
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

declare var $zoho: any;

@Injectable()
export class ZohoService {



   constructor() { }

   ayudaAreaDerecho(): void {
      $zoho.salesiq.visitor.question(`¡Hola! No sé por qué área del derecho buscar, ¿me podrías ayudar?`);
      $zoho.salesiq.floatwindow.visible("show");
   }

}
