import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { MapsAPILoader, AgmMap, MouseEvent } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';

import { StatsService } from './stats.service';
import { parseProfileMode } from '../../utils/parse-profile-mode';
import { StatsData } from './interfaces';
import { AccessMode, AccessLevel, Access } from '../../interfaces/profile-mode';
import { ProfileEmitterService } from "../../../_services/profile-emitter.service";

declare const jQuery: any;
declare var google: any;

@Component({
   selector: "app-profile-stats",
   templateUrl: "./stats.component.html",
   styleUrls: ["./styles/map-image.css", "./stats.styles.css"]
})
export class StatsComponent implements OnChanges, OnInit {
   @Input() shown;
   private hasInitiallyShown = false;

   isIrjBlocked = false;
   hasError = false;
   data: StatsData;
   xpLevel: string;
   errMsg: string;

   constructor(
      private statsService: StatsService,
      private route: ActivatedRoute,
      private profileEmitterService: ProfileEmitterService
   ) { }

   ngOnChanges() {
      if (this.shown && !this.hasInitiallyShown) {
         this.hasInitiallyShown = true;
         this.onInitialShow();
      }
   }

   ngOnInit() { }

   private onInitialShow() {
      const mode = parseProfileMode(this.route);
      const productoEjemplo = this.route.snapshot.queryParams["p"];
      this.statsService.getStatsData(mode, productoEjemplo).subscribe(
         x => {
            this.data = x.body;
            this.initXpLevel();
            this.initIrjBlocking();
            this.initTooltips();
            this.profileEmitterService.notifyLoaded();
            this.setAccessForRight();
         },
         err => {
            console.error(err);
            if (err.status === 444) {
               this.errMsg = "Perfil no encontrado";
            }
            this.hasError = true;
         }
      );
   }

   private setAccessForRight() {
      this.data.specialities.map(spec => {
         spec.access = spec.id ?
            { level: AccessLevel.Advanced, mode: this.data.access.mode }
            :
            { level: AccessLevel.None, mode: this.data.access.mode }
      });
      this.data.featuredAreas.map(area => {
         area.access = area.id ?
            { level: AccessLevel.Advanced, mode: this.data.access.mode }
            :
            { level: AccessLevel.None, mode: this.data.access.mode }
      });
   }

   private initIrjBlocking() {
      const access = this.data.access;
      if (access.mode === AccessMode.Directory) {
         if (access.level < AccessLevel.Advanced) {
            this.isIrjBlocked = true;
         }
      }
   }

   private initXpLevel() {
      const years = this.data.yearsOfXp;
      if (years <= 5) {
         this.xpLevel = "Junior";
      } else if (years <= 10) {
         this.xpLevel = "Intermediate";
      } else if (years <= 15) {
         this.xpLevel = "Advanced";
      } else {
         this.xpLevel = "Senior";
      }
   }

   initTooltips() {
      setTimeout(() => {
         jQuery('#specialitiesHeading').tooltip({
            title: () => jQuery('#specialitiesTooltipContent'),
         });
         jQuery('#featuredAreasHeading').tooltip({
            title: () => jQuery('#featuredAreasTooltipContent'),
         });
      }, 1000);
   }

   public buyProfile(e) {
      e.stopPropagation();
      if (this.isIrjBlocked) {
         if (this.data.access.mode === AccessMode.Ranking) {
            setTimeout(
               () => $("#modal-specialist-contract-plans")["modal"]("show"),
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
}
