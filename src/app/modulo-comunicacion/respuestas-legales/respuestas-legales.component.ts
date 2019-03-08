import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { LegalResponseService } from './../../_services/legal-response.service';
import { SharedUserService } from '../../_services/shared-user.service';
import { SharedModalResponseService } from './../_services/shared-modal-response.service';
import { SharedComunicationService } from './../_services/shared-state-comunication.service';

@Component({
   selector: 'app-respuestas-legales',
   templateUrl: './respuestas-legales.component.html',
   styleUrls: ['./respuestas-legales.component.css']
})
export class RespuestasLegalesComponent implements OnInit {
   private ngUnsubscribe: Subject<void> = new Subject<void>();
   isCustomer: boolean = false;
   screenWidth: number;
   level: number;
   SM: number = 576;

   constructor(private responseService: LegalResponseService,
      private router: Router,
      private sharedUserService: SharedUserService,
      private sharedComunicationService: SharedComunicationService,
   ) {

      this.router.events.subscribe(event => {
         if (event instanceof NavigationEnd) {
            this.level = event.url.split('/').length - 1;
            this.screenWidth = window.innerWidth;
            this.sharedComunicationService.emitLevel(this.level, this.screenWidth, this.SM);
         }
      })
   }
   ngOnInit() {
      this.isCustomer = this.sharedUserService.getUserTipo() == 1 ? true : false;
   }

   goBack() {
      let urlItem = this.router.url.split("/")
      // Para volver atras desde respuesta legal
      if (this.router.url.includes("respuestas-legales")) {
         if (this.level == 4) {
            let newUrl = urlItem[1] + "/" + urlItem[2] + "/" + urlItem[3];
            this.router.navigate([newUrl]);
         }
      }
   }

   // ngOnDestroy() {
   // }
}
