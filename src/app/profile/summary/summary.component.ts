import { Component, EventEmitter, Input, Output, OnChanges, OnDestroy, OnInit, HostListener, SimpleChanges, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { SummaryService } from "./summary.service";
import { parseProfileMode } from "../utils/parse-profile-mode";
import { SummaryData } from "./interfaces";
import {
   AccessMode,
   AccessLevel,
   Access,
   ProfileMode
} from "../interfaces/profile-mode";
import { SideBarEmitterService } from "../../_services/side-bar-emitter.service";
import { interval } from "rxjs";
import { take } from "rxjs/operators";
import { Title, Meta } from "@angular/platform-browser";
import { CapitalizePipe } from "../../_pipes/capitalize.pipe";

@Component({
   selector: "app-profile-summary",
   templateUrl: "./summary.component.html",
   styleUrls: ["./summary.styles.css"],
   providers: [CapitalizePipe]
})
export class SummaryComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
   @Input() sticky = false;

   hasError = false;
   showPrivateProfile = false;
   data: SummaryData;
   isIrjBlocked = false;
   mode: ProfileMode;
   isDirectory = true;
   customWidth = { width: '100%' };
   sectionProfileWidth = 0;
   sideBarOpen = false;
   isNavLawyer = false;
   errMsg: string;

   @Output() talkButtonIsRegistered: EventEmitter<boolean> = new EventEmitter();
   @Output() talkButtonAccessChange: EventEmitter<Access> = new EventEmitter();
   @Output() talkButtonHasQueries: EventEmitter<boolean> = new EventEmitter();

   private subscription: any[] = [];

   constructor(
      private route: ActivatedRoute,
      private router: Router,
      private summaryService: SummaryService,
      private sideBarEmitterService: SideBarEmitterService,
      private title: Title,
      private meta: Meta,
      private capitalize: CapitalizePipe
   ) { }

   ngOnInit() {
      this.setListener();
      this.mode = parseProfileMode(this.route);
      const derechoPrincipalId = this.route.snapshot.queryParams["d"];
      const alcance = this.route.snapshot.queryParams["a"];
      const categoria = this.route.snapshot.queryParams["c"];
      this.summaryService.getSummaryData(this.mode, derechoPrincipalId, alcance, categoria).subscribe(
         x => {
            this.data = x.body;
            this.initBlockPrivacy();
            this.initIrjBlocking();
            this.checkName(this.data.nameData.urlName);
            this.talkButtonAccessChange.emit(this.data.access);
            this.talkButtonIsRegistered.emit(this.data.isRegistered);
            this.talkButtonHasQueries.emit(this.data.hasQueries);
            this.setMetas();
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

   ngOnChanges(changes: SimpleChanges) {
      if (changes['sticky']) {
         this.onResize();
      }
   }

   ngAfterViewInit() {
      this.onResize();
   }

   ngOnDestroy() {
      this.subscription.forEach(val => val.unsubscribe());
      this.unsetMetas()
   }
   setMetas() {
      this.meta.addTag({
         name: 'description',
         content: `Visita su perfil en Emérita Legal. Descubre por qué es uno de los mejores especialistas en ${this.data.specsData.specs[0]} en ${this.data.location.locality}.`
      });
      this.title.setTitle(`${this.capitalize.transform(this.data.nameData.fullName)} | Abogado | ${this.data.location.locality}`);
   }
   unsetMetas() {
      this.meta.removeTag("name='robots'");
      this.meta.removeTag("name='description'");
   }
   checkName(nombre: string) {
      const token = this.route.snapshot.params.token;
      let arrName = token.split("-");
      arrName.pop(); //sacamos identificador y nos quedamos con el nombre
      const name = arrName.join(" ");
      if (!this.showPrivateProfile && name != nombre.toLowerCase())
         this.router.navigate(["/404"]);
   }
   initBlockPrivacy() {
      const privacyProfile = this.data.privacy.profile;
      if (privacyProfile) {
         this.showPrivateProfile = true;
      }
   }

   initIrjBlocking() {
      const access = this.data.access;
      if (access.mode === AccessMode.Directory) {
         this.isDirectory = true;
         if (access.level < AccessLevel.Advanced) {
            this.isIrjBlocked = true;
         }
      } else {
         this.isDirectory = false;
      }
   }

   plan() {
      if (this.isIrjBlocked) {
         setTimeout(
            () => $("#modal-profile-contract-plans")["modal"]("show"),
            200
         );
      }
   }

   setListener() {
      this.subscription.push(this.sideBarEmitterService.sideBarAnim$.subscribe((status) => {
         this.sideBarOpen = status;
         interval(25).pipe(take(13)).subscribe((x) => {
            this.onResize();
         })
      }));
   }

   setWidth() {
      if (this.sticky) {
         if (window.outerWidth >= 768 && this.customWidth.width != `${this.sectionProfileWidth}px`) {
            this.customWidth.width = `${this.sectionProfileWidth}px`;
         }
      } else {
         if (this.customWidth.width != '100%') {
            this.customWidth.width = '100%';
         }
      }
   }

   @HostListener("window:scroll", []) // for window scroll events
   onScroll() {
      this.setWidth();
   }

   @HostListener("window:resize", []) // for window resize events
   onResize() {
      this.isNavLawyer = document.querySelector("nav.topbar-abogado") ? true : false;
      const sectionProfile = document.querySelector(".section-profile");
      if (sectionProfile) {
         this.sectionProfileWidth = sectionProfile.getBoundingClientRect().width;
         this.setWidth();
      }
   }
}
