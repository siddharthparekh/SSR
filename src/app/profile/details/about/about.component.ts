import { Component, Input, OnChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { AboutService } from "./about.service";
import { parseProfileMode } from "../../utils/parse-profile-mode";
import { AboutData, LawyerAgency } from "./interfaces";
import { AccessMode, AccessLevel, ProfileMode } from "../../interfaces/profile-mode";
import {
   testAboutMeText,
   testCareerItem,
   testFormationItem,
   testLawyerAgency
} from "./test-data";
import { SharedUserService } from "./../../../_services/shared-user.service";

declare const $: any;

@Component({
   selector: "app-profile-about",
   templateUrl: "./about.component.html",
   styleUrls: ["../../styles/blockable.css"]
})
export class AboutComponent implements OnChanges {
   blocked = false;
   itIsMe: boolean;
   @Input() shown;
   private hasInitiallyShown = false;
   errMsg: string;

   hasError = false;
   data: AboutData;

   constructor(
      private aboutService: AboutService,
      private route: ActivatedRoute,
      private sharedUserService: SharedUserService
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
      this.itIsMe = this._itIsMe(mode);
      this.aboutService.getAboutData(mode).subscribe(
         x => {
            this.data = x.body;
            this.initBlocking();
         },
         err => {
            console.error(err);
            if (err.status === 444) {
               this.errMsg = "Perfil no encontrado";
            }
            this.hasError = true;
         });
   }

   private _itIsMe(mode: ProfileMode) {
      const userId = this.sharedUserService.getUserId();
      if (mode.accessMode == AccessMode.Directory && mode.identifier == userId)
         return true;
      else
         return false;
   }

   setAgencies(agencies: LawyerAgency[]) {
      this.data.agencies = agencies;
   }

   private initBlocking() {
      const access = this.data.access;
      if (access.mode === AccessMode.Ranking) {
         if (access.level < AccessLevel.Advanced) {
            this.data.aboutMeText = testAboutMeText;
            this.data.agencies = [testLawyerAgency];
            this.data.careerItems = [testCareerItem];
            this.data.formationItems = [testFormationItem];
            this.blocked = true;
         }
      }
   }

   get isDataPresent(): boolean {
      return (
         !!this.data.aboutMeText ||
         this.data.careerItems.length > 0 ||
         this.data.formationItems.length > 0
      );
   }
}
