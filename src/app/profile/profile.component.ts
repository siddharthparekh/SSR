import { Component, OnInit, AfterViewInit, HostListener, OnDestroy } from "@angular/core";
import { Access, AccessMode, ProfileMode } from "./interfaces/profile-mode";
import { parseProfileMode } from "./utils/parse-profile-mode";
import { ActivatedRoute, Router } from "@angular/router";
import { ProfileService } from "./profile.service";
import { IProducto } from "../_models/Producto";
import { ShoppingCarService } from "../_services/shopping.car.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { updateShoppingCarTrigger } from "../_utils/utilFunctions";
import { SharedUserService } from "../_services/shared-user.service";
import { Meta } from "@angular/platform-browser";
import { LinkService } from "../_services/linkService";

@Component({
   templateUrl: "./profile.component.html",
   styleUrls: ["./profile.component.styles.css"],
   providers: [ProfileService, ShoppingCarService, LinkService]
})
export class ProfileComponent implements OnInit, OnDestroy, AfterViewInit {
   headerSticky = false;
   talkButtonAccess: Access;
   talkButtonIsRegistered: boolean;
   talkButtonHasQueries: boolean;
   accessModes = AccessMode;
   mode: ProfileMode;
   showFooterButtons = true;
   ngUnsubscribe = new Subject<void>();
   showSharedLinksMob = false;
   public width = 0;
   public headerHeight = 0;
   supportHeaderScroll: boolean = true;

   constructor(
      private route: ActivatedRoute,
      private sharedUserService: SharedUserService,
      private meta: Meta,
      private linkService: LinkService
   ) {
   }

   ngOnInit() {
      this.mode = parseProfileMode(this.route);
      this.setShowFooterButton();
      this.setMetas();
      this.checkBrowser();
   }

   ngOnDestroy() {
      this.showSharedLinksMob = false;
      this.unsetMetas();
   }

   checkBrowser() {
      const isFirefox = navigator.userAgent.indexOf("Firefox") != -1;
      const isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);

      this.supportHeaderScroll = isFirefox || isIEOrEdge ? false : true;
   }

   setMetas() {
      const token = this.route.snapshot.params.token;
      this.meta.removeTag("name='robots'");
      this.linkService.addTag({ rel: "canonical", href: `https://wwww.emerita.legal/abogado/${token}` });
   }
   unsetMetas() {
      this.meta.addTag({ name: 'robots', content: 'noindex' });
      this.linkService.removeCanonicalLink();
   }

   setShowFooterButton() {
      const user = this.sharedUserService.getUser();
      if (user && user.tipo != 1 && user.id === this.mode.identifier) {
         this.showFooterButtons = false;
      }
   }

   onTalkButtonAccessChange($event) {
      this.talkButtonAccess = $event;
   }

   onTalkButtonIsRegistered($event) {
      this.talkButtonIsRegistered = $event;
   }
   onTalkButtonHasQueries($event) {
      this.talkButtonHasQueries = $event;
   }


   ngAfterViewInit() {
      this.onResize();
   }

   @HostListener("window:resize", []) // for window resize events
   onResize() {
      this.width = window.outerWidth;
      if (this.supportHeaderScroll)
         this.headerScrollInit();
   }



   headerScrollInit() {
      const header = document.querySelector("app-profile-summary");
      const details = document.querySelector("app-profile-details");
      const navLawyer = document.querySelector("nav.topbar-abogado");
      let offsetHeight = this.width > 768 ? navLawyer ? 170 : 189 : 130;

      window.onscroll = () => {
         const rect = header.getBoundingClientRect();
         if (rect.height > 0) {
            this.headerHeight = rect.height;
         }
         let topLimit = -this.headerHeight + offsetHeight + this.getDifferences(rect.height);
         if (rect.top <= topLimit) {
            if (rect.height > 40) {
               const paddingTop = `${this.headerHeight}px`;
               // @ts-ignore
               details.style.paddingTop = paddingTop;
            }
            this.headerSticky = true;
         } else {
            // @ts-ignore
            details.style.paddingTop = "0px";
            this.headerSticky = false;
         }
      };
   }

   private getDifferences(_height): number {
      if (_height === 0) {
         if (this.width < 768) {
            return 3;
         } else {
            if (this.width < 991) {
               return 23;
            } else {
               return 47;
            }
         }
      }

      return 0;
   }
}
