import { Component, Input, OnInit } from "@angular/core";

import { SpecsData } from "../interfaces";
import { AccessMode, AccessLevel, Access } from "../../interfaces/profile-mode";
import { testSpecs } from "../test-data";

function capitalize(str: string): string {
   if (!str) return;
   const _str = str.toLowerCase();
   return _str.charAt(0).toUpperCase() + _str.slice(1);
}

@Component({
   selector: "app-profile-summary-specs",
   templateUrl: "./specs.component.html",
   styleUrls: ["../../styles/blockable.css"]
})
export class SpecsComponent implements OnInit {
   blocked = false;
   directoryMode = AccessMode.Directory;
   rankingMode = AccessMode.Ranking;
   @Input() data: SpecsData;
   @Input() access: Access;

   ngOnInit() {
      this.data.specs = this.data.specs.map(x => capitalize(x));
      const access = this.access;
      if (access && access.mode === AccessMode.Directory) {
         if (access.level < AccessLevel.Essential) {
            this.data.specs = testSpecs;
            this.blocked = true;
         }
      }
   }

   get isDataPresent(): boolean {
      return this.data && this.data.specs && this.data.specs.length !== 0;
   }

   plan() {
      if (this.blocked) {
         setTimeout(
            () => $("#modal-profile-contract-plans")["modal"]("show"),
            200
         );
      }
   }
}
