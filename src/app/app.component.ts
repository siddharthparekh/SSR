import {
   AfterViewChecked,
   ChangeDetectorRef,
   Component,
   ElementRef,
   OnInit,
   ViewChild
} from "@angular/core";
import {
   ActivatedRoute,
   Event as RouterEvent,
   NavigationCancel,
   NavigationEnd,
   NavigationError,
   NavigationStart,
   Router
} from "@angular/router";
import { ToastOptions, ToastyConfig, ToastyService } from "ng2-toasty";
import { DeviceDetectorService } from "ngx-device-detector";
import { Subject } from "rxjs";
import { filter, map, mergeMap } from "rxjs/operators";

import { MessengerService } from "./_services/messenger.service";
import { SharedUserService } from "./_services/shared-user.service";
import { UserService } from "./_services/user.service";
import { ToastOptionsClass } from "./_utils/toastOptionsClass";
import { SideBarEmitterService } from "./_services/side-bar-emitter.service";
import { Location } from "@angular/common";
import { Meta } from "@angular/platform-browser";

declare var gtag: any;
declare var $: any;

@Component({
   selector: "app-root",
   templateUrl: "./app.component.html",
   styleUrls: ["./app.component.css"],
   providers: [UserService]
})
export class AppComponent implements OnInit, AfterViewChecked {
   @ViewChild("cookieLaw")
   private cookieLawEl: any;
   cookieLawSeen: boolean;
   reqInProg: boolean = false;
   errorMsg: string = "";
   suggestion: string = "";
   url$: Subject<string> = new Subject<string>();
   url: string;
   titlePage$: Subject<any> = new Subject<any>();
   t: any;
   email: string;
   texto: string;
   asunto: string;
   nombre: string;
   condiciones: boolean;
   noticias: boolean;
   isCaptchaOk: boolean = false;
   s: any;
   showSidebar: boolean = undefined;
   isAbogado = false;
   statusSidebar = false;
   dockSidebar = false;
   positionSidebar = "left";
   showToggleSidebar = false;
   modeSidebar = "push";
   deviceInfo = null;
   isMobile = false;
   isTablet = false;
   isDesktopDevice = false;
   imgLink = "menu.png";
   menuLink = "Mi Dashboard";
   @ViewChild("sidebarMenu") private sidebarMenu: ElementRef;
   openedGroup = false;
   user: any = null;
   arrayUrlProfile: any[] = [];
   userurl1 = "";
   userurl2 = "";
   miperfil = false;

   constructor(
      private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
      private toastyConfig: ToastyConfig,
      private route: ActivatedRoute,
      private messenger: MessengerService,
      private sharedUserService: SharedUserService,
      private userService: UserService,
      private router: Router,
      private deviceService: DeviceDetectorService,
      private _changeDetectionRef: ChangeDetectorRef,
      private sideBarEmitterService: SideBarEmitterService,
      private location: Location,
      private meta: Meta
   ) {
      this.toastyConfig.theme = "default";
      this.detectDevice();
      router.events.subscribe((event: RouterEvent) => {
         this.navigationInterceptor(event);
      });

      location.subscribe((onnext) => {
         if (onnext && onnext.pop && $(document.body).hasClass("modal-open")) {
            console.log('location', onnext);
            $('.modal')['modal']('hide');
            $(document.body).removeClass("modal-open");
            $(".modal-backdrop").remove();
         }
      });

      this.router.events
         .pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.route),
            map(route => {
               while (route.firstChild) route = route.firstChild;
               return route;
            }),
            filter(route => route.outlet === "primary"),
            mergeMap(route => route.data)
         )
         .subscribe(event => {
            // Setear el texto e icono del menú por ruta
            if (event && event.menutitle) {
               this.menuLink = event.menutitle;
            } else {
               this.menuLink = "Mi Dashboard";
            }
            if (event && event.menuicon) {
               this.imgLink = event.menuicon;
            } else {
               this.imgLink = "menu.png";
            }
            this.titlePage$.next(event);
         });

      this.handleLogoutTarifas();
   }

   ngOnInit(): void {
      this.cookieLawSeen = this.cookieLawEl.cookieLawSeen;
      this.initSeo();
   }

   ngAfterViewChecked(): void {
      this._changeDetectionRef.detectChanges();
   }

   initSeo() {
      this.meta.addTag({ name: 'robots', content: 'noindex' });
   }

   navigationInterceptor(event: RouterEvent): void {
      // console.log(event);
      if (event instanceof NavigationStart) {
         if (!event.url.startsWith("/directorio") && !event.url.startsWith('/ranking')) {
            window.scroll(0, 0);
         }
      }
      if (event instanceof NavigationEnd) {
         this.url$.next(event.url);
         this.url = event.url;
         updatePathAnalytics(event);
         this.openedGroup = false;
         this.showToggleSidebar = false;
         this.miperfil = false;
         if (
            !this.isAbogado ||
            // AGREGAR URLS QUE DEBEN OCULTAR EL SIDEBAR
            event.url.startsWith("/accountsettings") ||
            event.url.startsWith("/inbox") 
         ) {
            this.disableSidebar();
         } else {
            if (
               (this.userurl1 &&
                  this.userurl2 &&
                  event.url.startsWith("/abogado/" + this.userurl2)) ||
               (this.userurl1 &&
                  this.userurl2 &&
                  event.url.startsWith("/abogado-int/" + this.userurl2))
            ) {
               this.miperfil = true;
               this.imgLink = "menu.png";
               this.menuLink = "Mi Dashboard";
            }
            this.enableSidebar();
         }
      }
   }

   handleLogoutTarifas() {
      if (this.sharedUserService.isLoggedIn()) {
         const user = this.sharedUserService.getUser();
         if (!user.MetaFront) {
            this.sharedUserService.logout();
            this.router.navigate(["/"]);
         }
      }
   }

   public dismiss(): void {
      this.cookieLawEl.dismiss();
   }

   detectDevice() {
      this.deviceInfo = this.deviceService.getDeviceInfo();
      this.isMobile = this.deviceService.isMobile();
      this.isTablet = this.deviceService.isTablet();
      this.isDesktopDevice = this.deviceService.isDesktop();
      // console.log(this.deviceInfo);
      // console.log('isMobile', this.isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
      // console.log('isTablet', this.isTablet);  // returns if the device us a tablet (iPad etc)
      // console.log('isDesktopDevice', this.isDesktopDevice); // returns if the app is running on a Desktop browser.
   }

   // onShowSidebar(showSidebar: boolean) {
   //   this.showSidebar = showSidebar;
   // }

   enableSidebar() {
      if (this.isMobile) {
         this.showToggleSidebar = false; //TODO: cambiar a false
         this.showSidebar = true;
         this.statusSidebar = false;
         this.dockSidebar = true;
         this.positionSidebar = "top";
      } else if (this.isTablet) {
         this.showToggleSidebar = true;
         this.showSidebar = true;
         this.statusSidebar = false;
         this.dockSidebar = true;
         this.modeSidebar = "over";
      } else if (this.isDesktopDevice) {
         this.showToggleSidebar = true;
         this.showSidebar = true;
         if (this.modeSidebar === "over") {
            this.statusSidebar = false;
         } else {
            this.statusSidebar = true;
         }
         // this.statusSidebar = true;
         this.dockSidebar = true;
      } else {
         this.disableSidebar();
      }
      // console.log('enableSidebar()', 'isMobile', this.isMobile, 'isTablet', this.isTablet, 'isDesktopDevice', this.isDesktopDevice)
      // console.log('showToggleSidebar', this.showToggleSidebar, 'showSidebar', this.showSidebar, 'statusSidebar', this.statusSidebar)
      // console.log('dockSidebar', this.dockSidebar, 'modeSidebar', this.modeSidebar, 'positionSidebar', this.positionSidebar)
   }

   disableSidebar() {
      this.showSidebar = false;
      this.dockSidebar = false;
      // console.log('disableSidebar()', 'isMobile', this.isMobile, 'isTablet', this.isTablet, 'isDesktopDevice', this.isDesktopDevice)
      // console.log('showToggleSidebar', this.showToggleSidebar, 'showSidebar', this.showSidebar, 'statusSidebar', this.statusSidebar)
      // console.log('dockSidebar', this.dockSidebar, 'modeSidebar', this.modeSidebar, 'positionSidebar', this.positionSidebar)
      // // this.showToggleSidebar = false;
   }

   onSetAbogado(isAbogado: boolean) {
      this.isAbogado = isAbogado;
      if (this.isAbogado) {
         this.user = this.sharedUserService.getUser();
         this.arrayUrlProfile = this.sharedUserService.getProfileUrl(
            this.user,
            false
         );
         if (this.arrayUrlProfile.length >= 2) {
            this.userurl1 = this.arrayUrlProfile[0];
            this.userurl2 = this.arrayUrlProfile[1];
         }
         // console.log(this.user, this.arrayUrlProfile);
         this.modeSidebar = "over";
         this.enableSidebar();
      } else {
         this.disableSidebar();
      }
   }

   onToggleSidebar(statusSidebar: boolean) {
      this.statusSidebar = !this.statusSidebar;
      this.sideBarEmitterService.sideBarAnim(this.statusSidebar);
      if (this.statusSidebar) {
         this.modeSidebar = "push";
      } else {
         if (this.isMobile) {
            this.modeSidebar = "push";
         } else {
            this.modeSidebar = "over";
         }
      }
      // console.log('statusSidebar', this.statusSidebar, 'modeSidebar', this.modeSidebar)
   }
   mouseEnter(element: any) {
      if (this.modeSidebar === "over" || this.isTablet) {
         this.statusSidebar = true;
      }
   }
   mouseLeave(element: any) {
      if (this.modeSidebar === "over" || this.isTablet) {
         this.statusSidebar = false;
      }
   }

   clickSidebar() {
      if (this.isTablet && this.modeSidebar === "over") {
         this.statusSidebar = true;
      }
   }

   changeLink(event) {
      if (event && event.image && event.link) {
         this.imgLink = event.image;
         this.menuLink = event.link;
      } else {
         this.imgLink = "menu.png";
         this.menuLink = "Mi Dashboard";
      }
   }

   changeOpenedGroup(event: boolean) {
      this.openedGroup = event;
   }

   scrollSidebar() {
      try {
         // this.sidebarMenu.nativeElement.scrollTop = this.sidebarMenu.nativeElement.scrollHeight;
         // $('#sidebarMenu').animate({scrollTop: $('#sidebarMenu').height()}, 500);
         // $('#ng-sidebar--left').animate({scrollTop: $('#sidebarMenu').height()}, 500);
         $(".ng-sidebar--left")
            .first()
            .scrollTop(document.getElementById("sidebarMenu").scrollHeight);
         // console.log(this.sidebarMenu);
         // $('#sidebarMenu')
      } catch (error) {
         console.log(error);
      }
   }

   // collapseEvent() {
   // $(".collapse.sidebar-nav-group").collapse('hide');
   // $(".collapse.sidebar-nav-group").removeClass("show");
   // var $sidebarMenu = $('#sidebarMenu');
   // $sidebarMenu.on('show.bs.collapse','.collapse', function() {
   //     $sidebarMenu.find('.collapse.in').collapse('hide');
   // });
   // }
}
function updatePathAnalytics(event: NavigationEnd){
  gtag('config', 'UA-68072422-3', {'page_path': event.urlAfterRedirects});
}
