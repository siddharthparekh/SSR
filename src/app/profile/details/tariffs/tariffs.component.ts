import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { parseProfileMode } from '../../utils/parse-profile-mode';
import { TariffsService } from './tariffs.service';
import { TariffsData } from './interfaces';
import { AccessMode, AccessLevel } from '../../interfaces/profile-mode';
import { testTariffsGroup1, testTariffsGroup2 } from './test-data';

declare const $: any;

@Component({
   selector: 'app-profile-tariffs',
   templateUrl: './tariffs.component.html',
   styleUrls: [
      '../../styles/blockable.css',
   ],
})
export class TariffsComponent {
   blocked = false;
   @Input() shown;
   private hasInitiallyShown = false;

   data: TariffsData;

   constructor(
      private tariffsService: TariffsService,
      private route: ActivatedRoute,
   ) { }

   ngOnChanges() {
      if (this.shown && !this.hasInitiallyShown) {
         this.hasInitiallyShown = true;
         this.onInitialShow();
      }
   }

   public buyProfile() {
      if (this.blocked) {
         if (this.data.access.mode === AccessMode.Ranking) {
            setTimeout(
               () => $("#modal-specilist-contract-plans")["modal"]("show"),
               200
            );
         }
         if (this.data.access.mode === AccessMode.Directory) {
            setTimeout(
               () => $("#modal-profile-contract-plans")["modal"]("show"),
               200
            );
         }
      }
   }

   private onInitialShow() {
      const mode = parseProfileMode(this.route);
      const productoEjemplo = this.route.snapshot.queryParams["p"];
      this.tariffsService.getTariffs(mode, productoEjemplo).subscribe(
         data => {
            this.data = data;
            this.initBlocking();
         },
      );
   }

   private initBlocking() {
      const access = this.data.access;
      if (access.mode === AccessMode.Directory) {
         if (access.level < AccessLevel.None) {
            this.data.groups = [testTariffsGroup1, testTariffsGroup2];
            this.blocked = true;
         }
      }
   }

   get isDataPresent(): boolean {
      return this.data && this.data.groups.length > 0;
   }

   onAvailabilityClick($event) {
      $event.preventDefault();
   }
}
