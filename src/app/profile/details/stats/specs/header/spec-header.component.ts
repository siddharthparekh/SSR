import {
   Component,
   Output,
   EventEmitter,
   Input,
   OnInit,
   ViewChild,
   ElementRef,
   AfterViewInit,
   OnChanges,
   SimpleChanges,
   OnDestroy
} from "@angular/core";

import {
   Access,
   AccessMode,
   AccessLevel
} from "../../../../interfaces/profile-mode";
import { HeaderData } from "../interfaces";
import { ActivatedRoute } from "@angular/router";

declare var $: any;

@Component({
   selector: "app-profile-spec-header",
   templateUrl: "./spec-header.component.html",
   styleUrls: [
      "../../../../styles/blockable.css",
      "./bdg-light.css",
      "./spec-header.styles.css"
   ]
})
export class SpecHeaderComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
   @Input() data: HeaderData;
   @Input() access: Access;
   @Input() specialities = false;
   blocked = false;

   @Output() toggleContent: EventEmitter<boolean> = new EventEmitter();
   isContentOpened = false;

   @ViewChild("toggleSwitchSpecialities")
   public toggleSwitchSpecialities: ElementRef;

   scrollIntoThisSpecialitiesId = "";
   private executedAutoFocus = false;
   private timer: any;

   constructor(private route: ActivatedRoute) { }

   ngOnInit() {
      const access = this.access;
      if (access && access.mode === AccessMode.Directory) {
         if (access.level < AccessLevel.Advanced) {
            this.blocked = true;
         } else {
            this.toggleSwitch();
         }
      }
   }

   ngOnChanges(changes: SimpleChanges) {
      if (changes["data"]) {
         this.scrollIntoThisSpecialitiesId = `scrollIntoThisSpecialitiesId-${
            this.data.id
            }`;
      }
   }

   ngOnDestroy() {
      clearTimeout(this.timer);
   }

   ngAfterViewInit() {
      this.shouldPresentSpecialist();
   }

   shouldPresentSpecialist() {
      if (this.specialities) {
         clearTimeout(this.timer);
         this.timer = setTimeout(() => {
            if (!this.executedAutoFocus) {
               if (this.access && this.access.mode === AccessMode.Ranking) {
                  const derechoId = this.route.snapshot.queryParams["d"] && parseInt(this.route.snapshot.queryParams["d"]);
                  if (
                     this.data &&
                     this.data.id === derechoId
                  ) {
                     this.executedAutoFocus = true;
                     this.toggleSwitchSpecialities.nativeElement.click();
                     $("html, body").animate(
                        {
                           scrollTop: $(`#${this.scrollIntoThisSpecialitiesId}`).offset()
                              .top
                        },
                        1500
                     );
                  }
               }
            }
         }, 1500);
      }
   }

   toggleSwitch($event?) {
      if ($event) $event.preventDefault();
      this.isContentOpened = !this.isContentOpened;
      this.toggleContent.emit(this.isContentOpened);
   }

   public buyProfile(e) {
      e.stopPropagation();
      if (this.blocked) {
         if (this.access.mode === AccessMode.Ranking) {
            setTimeout(
               () => $("#modal-specialist-contract-plans")["modal"]("show"),
               200
            );
         }
         if (this.access.mode === AccessMode.Directory) {
            setTimeout(
               () => $("#modal-profile-contract-plans")["modal"]("show"),
               200
            );
         }
      }
   }
}
