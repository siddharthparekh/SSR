
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, Input, HostListener, EventEmitter, Output } from '@angular/core';
import { SharedUserService } from './../../_services/shared-user.service';
import { Select2OptionData } from 'ng2-select2';
import { MessengerService } from './../../_services/messenger.service';

import { Subject, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { Location } from '@angular/common';
import { IUsuario } from './../../_models/Usuario';
import { IConversacion } from './../../_models/Conversacion';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { RoutesService } from './../../_services/routes.service';
import { ModalsService } from './../../_services/modals.service';
// import { PageVisibilityService } from "angular-page-visibility";
import { Title } from "@angular/platform-browser";
import { ShoppingCarService } from '../../_services/shopping.car.service';
import { OnUpdateShoppingCar } from '../../_utils/utilFunctions';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
  providers: [ShoppingCarService],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => *', animate('.3s'))
    ])
  ]
})
export class TopbarComponent implements OnInit, OnDestroy {
  user: IUsuario;
  isLoggedIn = false;
  @Input() url$: Observable<string>;
  @Input() titlePage$: Observable<any>;
  @Input() showToggleSidebar: boolean = false;
  titlePage: string;
  parent: string;
  locationBack: boolean;
  url: string;
  showNav: boolean;
  v: string;
  conversations: Array<IConversacion> = [];
  conversationsUnread = 0;
  isFocusSearchInput = false;
  searchTerm: string = "";
  reqInProg: boolean;
  screenWidth: number;
  MDSize = 768
  notify: boolean = false;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  isDocumentShown: boolean;
  isTabNotificated: boolean;
  originalTabTitle: string;
  products: any[] = [];
  @Output() setAbogado: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  showDropdownMenu = true;
  showDropdownMenuNoLogin = true;

  constructor(private router: Router,
    // private solrService: SolrService,
    private _location: Location,
    private route: ActivatedRoute,
    private routesService: RoutesService,
    private title: Title,
    // private pageVisibilityService: PageVisibilityService,
    private sharedUserService: SharedUserService,
    private modalSharedService: ModalsService,
    private messengerService: MessengerService,
    private shoppingCarService: ShoppingCarService) {

    OnUpdateShoppingCar.subscribe((user_id: any) => {
      this.load_products(user_id);
    })
    // this.searchUser = this.searchUser.bind(this);
  }

  // notifyTab() {
  //   if (this.isDocumentShown === false) {
  //     this.title.setTitle("● " + this.title.getTitle());
  //     this.isTabNotificated = true;
  //   }
  // }

  isNavVisible(url: string): boolean {
    this.url = url.split(/\/|\?/)[1]; //regex split con "/" ou con ?

    return !(this.url == '' || this.url == 'abogados' || this.url == 'auth');
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = event.target.innerWidth;
  }

  ngOnInit() {
    // this.pageVisibilityService.$onPageVisibilityChange
    //   .subscribe((isPageVisible: boolean) => {
    //     if (isPageVisible) {
    //       this.isDocumentShown = true;
    //       if (this.isTabNotificated) {
    //         this.title.setTitle(this.title.getTitle().substring(2));
    //       };
    //       this.isTabNotificated = false;
    //     } else {
    //       this.isDocumentShown = false;
    //     }
    //   });
    this.screenWidth = window.innerWidth;
    this.titlePage$.pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.v = data && data.title ? 'shown' : 'hidden';
        this.locationBack = data && data.locationBack;
        this.parent = data && data.parent;
        if (data.title) this.titlePage = data.title;
        else setTimeout(() => this.titlePage = data.title, 500);
      });
    this.url$.pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(url => {
        this.showNav = this.isNavVisible(url);
      });
    this.sharedUserService.isLogged$.pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(isLogged => {
        if (!isLogged) {
          this.isLoggedIn = false;
          this.user = null;
          this.conversations = [];
          this.conversationsUnread = 0;
        } else {
          this.isLoggedIn = true;
          this.user = this.sharedUserService.getUser();
          if (this.user && this.user.tipo != 1) {
            this.setAbogado.emit(true);
          } else {
            this.setAbogado.emit(false);
          }
          this.messengerService.getConversations().pipe(
            takeUntil(this.ngUnsubscribe))
            .subscribe((convs) => {
              this.conversations = convs;
              //this.notify = this.isAnyConversationUnread(this.conversations);
              this.conversations.map(c => {
                const i = c.Usuarios.findIndex(u => u.id == this.user.id);
                c.Usuarios.splice(i, 1);
                if (shouldINotify(c, this.sharedUserService.getUserId())) {
                  this.messengerService.emitNotify();
                } else c.visto = true;
              });
              this.notify = this.isAnyConversationUnread(this.conversations);
            }, err => {
            });
          this.onConversationIn();
          this.onMessageIn();
          this.messengerService.onNotify().pipe(
            takeUntil(this.ngUnsubscribe))
            .subscribe((idConv) => {
              //se notifica un numero > 0 significa que é o id dunha conversa e que xa se veu (visto = true);
              if (idConv > 0) {
                let conv = this.conversations.find(c => c.id == idConv);
                if (conv) {
                  conv.visto = true;
                  // this.conversationsUnread = 0;
                  // this.notify = this.isAnyConversationUnread(this.conversations);
                }
                this.conversationsUnread = 0;
                this.notify = this.isAnyConversationUnread(this.conversations);
              } else {
                this.notify = true;
              }
            });
        }
      });
    this.sharedUserService.updateLoginStatus();

    this.load_products();
  }
  load_products(user_id?: number) {
    this.shoppingCarService.products(user_id).subscribe((products: any) => {
      this.products = products;
    })
  }

  onMessageIn() {
    this.messengerService.onMessageIn().pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe((dataMsg) => {
        this.playAudio();
        // this.notifyTab();
        this.moveItemToStart(this.conversations, dataMsg.conversation.id);
        this.setConversationAsUnread(dataMsg.conversation.id);
        if (dataMsg.conversation.id > 0) {
          let conv = this.conversations.find(c => c.id == dataMsg.conversation.id);
          if (conv) {
            conv.visto = false;
            this.conversationsUnread = 0;
            this.notify = this.isAnyConversationUnread(this.conversations);
          }}
      })
  }
  onConversationIn() {
    this.messengerService.onConversationIn().pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(c => {
        //eliminase o usuario que envia para pintar o usuario destinatario sin equivocacio
        const i = c.Usuarios.findIndex(u => u.id == this.user.id);
        if (i >= 0) {
          c.Usuarios.splice(i, 1);
          //c.visto = true; //si é o usuario que envia obviamente a veu
        }
        this.conversations.unshift(c);
        this.playAudio();
        if(this.user.tipo !=1){
          this.conversationsUnread = 0;
          this.notify = this.isAnyConversationUnread(this.conversations);
          this.conversations.splice(0, 1);
        }
        // this.notifyTab();
      });
  }

  playAudio() {
    const audio = new Audio();
    audio.src = "assets/sounds/audiochat.mp3";
    audio.load();
    audio.play();
  }

  goBack() {
    const backRoute = this.routesService.getBackRoute();
    if (backRoute) {
      this.router.navigate(backRoute.commands);
      this.routesService.setBackRoute(null);
    }
    else if (this.locationBack) this._location.back();
    else if (this.parent) this.router.navigate(['../../' + this.parent], { relativeTo: this.route });
    else this.router.navigate(['../'], { relativeTo: this.route });
  }
  irProfesional() {
    this.router.navigate(this.sharedUserService.getProfileUrl(this.sharedUserService.getUser(), false));
  }
  goToLogin() {
    if (this.url === 'abogados') {
      this.router.navigate(['abogados/auth'], { relativeTo: this.route });
    } else
      this.router.navigate(['auth'], { relativeTo: this.route });
  }
  // searchUser(terms: Observable<string>): Observable<any[]> {
  //   return terms
  //     .debounceTime(300)
  //     .distinctUntilChanged()
  //     .do(() => this.reqInProg = true)
  //     .switchMap(term =>
  //       this.solrService.findUsersAutocomplete(term)
  //     ).do(() => this.reqInProg = false);
  // }
  formatterInput = (x: any) => this.transform(x.value);
  formatter = (x: any) => this.transform(x.value);

  transform(value: any) {
    if (value) {
      value = value.toLowerCase();
      var res = "";
      var arr = value.split(" ");
      for (let i of arr) {
        res += i.charAt(0).toUpperCase() + i.slice(1) + " ";
      }
      return res;
    } else
      return '';
  }
  focusSearchInput(value) {
    setTimeout(() => this.isFocusSearchInput = value, 0);
  }
  onSelected(lawyer: NgbTypeaheadSelectItemEvent) {
    this.router.navigate(['/profile', lawyer.item.idSolr.replace(/ /g, '_')]);
  }
  logout() {
    this.isLoggedIn = false;
    this.user = undefined;
    this.setAbogado.emit(false);
    this.sharedUserService.logout();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  moveItemToStart(array: any[], idItem: number): void {
    if (!array) return;
    if (array[0].id == idItem) return;
    const i: number = array.findIndex(c => c.id == idItem);
    if (i < 0) return;
    const copyConv: any = Object.assign({}, array[i]);
    array.splice(i, 1);
    array.unshift(copyConv);
    return;
  }
  setConversationAsUnread(idConv: number): void {
    const i = this.conversations.findIndex(c => c.id == idConv);
    if (i < 0) return;
    this.conversations[i].visto = false;
  }

  clickSidebar() {
    this.toggleSidebar.emit(true);
  }

  closeDropdownMenu() {
    this.showDropdownMenu = true;
  }

  closeDropdownMenuNoLogin() {
    this.showDropdownMenuNoLogin = true;
  }

 isAnyConversationUnread(conversaciones: IConversacion[]): boolean {
   conversaciones.forEach( function( conv ) {
    if (!conv.visto) {
          this.conversationsUnread = this.conversationsUnread + 1;
         }
  }, this);
  return true;
  }

}
function shouldINotify(conversation: IConversacion, myUserId: number) {
  const mensajes = conversation.Mensajes;
  return (!conversation.visto && (myUserId != mensajes[0].Remitente.id));
}
function isAnyConversationUnread(conversaciones: IConversacion[]): boolean {
  for (let i = 0; i < conversaciones.length; i++) {
    if (!conversaciones[i].visto) {
      this.conversationsUnread += 1;
      return true;
    }
  }
}
