import { Component, OnInit, Inject, HostListener, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SharedUserService } from '../../_services/shared-user.service';
import { IUsuarioStorage } from '../../_models/UsuarioStorage';
import { Subject } from 'rxjs';
import { ShoppingCarService } from '../../_services/shopping.car.service';
import { UserService } from '../../_services/user.service';
import { takeUntil } from 'rxjs/operators';
import { ToastyService, ToastOptions } from 'ng2-toasty'
import { ToastOptionsClass } from '../../_utils/toastOptionsClass';
import { InvoicePaymentService } from '../../_services/invoice.payment.service';
import { PaymentsService } from '../../_services/payments.service';
import { AuthService } from 'angular2-social-login';
import { CustomerService } from '../../_services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatNumber } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnUpdateShoppingCar, updateShoppingCarTrigger } from '../../_utils/utilFunctions';

declare var gtag: any;

@Component({
   styleUrls: ['./invoice.checkout.component.css'],
   selector: 'invoice-checkout',
   templateUrl: 'invoice.checkout.component.html',
   providers: [ShoppingCarService, UserService, InvoicePaymentService, AuthService, CustomerService]
})

export class InvoiceCheckoutComponent implements OnInit, AfterViewInit {
   items: any[] = [];
   total: number = 0;

   ngUnsubscribe: Subject<void> = new Subject<void>();
   iva: number = 0;
   invoice: any = {
      payment_type: 'tarjeta',
      condition: false,
      card_id: '',
      cardData: {},
      datosFacturacion: {},
      descuentos: [],
      items: [],
      emisorEsEntidad: false,
      "noticias": true,
      "privacidad": true
   };
   has_logged: boolean = false;

   editing: boolean = false;
   isValidFacturacion = true;
   user: any;
   errors: string = '';
   loading: boolean = false;
   cardForm: FormGroup;
   // public creditcardMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
   public creditcardMask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
   public sticky = false;
   public stickyBottom = false;
   public width = 0;
   public bottomNavContent: number;
   @ViewChild("profileNavHolder") profileNavHolder: ElementRef;
   isNavLawyer = false;

   constructor(
      private sharedUserService: SharedUserService,
      private shoppingCarService: ShoppingCarService,
      private userService: UserService,
      private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
      private invoicePaymentService: InvoicePaymentService,
      private paymentService: PaymentsService,
      public _auth: AuthService,
      private fb: FormBuilder,
      private customerService: CustomerService,
      private router: Router,
      private route: ActivatedRoute,
      @Inject(LOCALE_ID) public locale: string
   ) {

      this.cardForm = this.fb.group({
         number: ['', [Validators.pattern('[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}'), Validators.required]],
         cvc: ['', [Validators.pattern('[0-9]{3}'), Validators.required]],
         exp_month: ['', [Validators.pattern('[0-9]{1,2}'), Validators.required, Validators.min(1), Validators.max(12)]],
         exp_year: ['', [Validators.pattern('[0-9]{4}'), Validators.required, Validators.min(new Date().getFullYear()), Validators.max(3000)]],
      });
      this.user = this.sharedUserService.getUser();
      this.user = this.user || {};
      if (this.user.id) {
         this.invoice.email = this.user.email;
         this.editing = false;
         this.invoice.datosFacturacion = this.user.DatosFacturaciones;
      }
   }
   invoiceData(data) {
      this.invoice.datosFacturacion = data;
   }
   onFacturacion(event: any) {
      this.editing = false;
      this.user = {};
      var backendFormulario = Object.assign({}, this.invoice.datosFacturacion);
      backendFormulario.iban = this.formatCardNumberForBackend(this.invoice.datosFacturacion.iban);
      this.paymentService.updateDatosFacturacion(backendFormulario).pipe(
         takeUntil(this.ngUnsubscribe))
         .subscribe(
            () => {
               this.sharedUserService.setDatosFacturacion(backendFormulario);
               this.user = this.sharedUserService.getUser();
            }, (err) => {
               console.log(err)
            })
   }
   onIsValidFacturacion(e) {
      this.isValidFacturacion = e;
   }

   toggleFactura() {
      if (this.invoice.emisorEsEntidad && !this.user.id) {
         this.editing = true;
      } else this.editing = false;
   }

   formatCardNumberForBackend(cardnumber: string): string {
      if (!cardnumber) return undefined;
      return cardnumber.replace(/ /g, '');
   }

   ngOnInit() {
      this.seguimientoAdwords();
      this.get_products();

      OnUpdateShoppingCar.subscribe((user_id: number) => {
         this.get_products(user_id);
      })
   }
   seguimientoAdwords() {
      gtag('event', 'conversion', {'send_to': 'AW-815292843/7yn3COm3q5EBEKvD4YQD'});
   }
   google_login() {
      var toast: ToastOptions = this.toastOptionsClass.toastOptions;
      this._auth.login('google').pipe(takeUntil(this.ngUnsubscribe)).subscribe(
         (data) => {
            this.customerService.googleAuth(data).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res) => {
               let user: IUsuarioStorage = res.Usuario;
               this.sharedUserService.setUserInfo(user, res.Usuario.token);

               this.user = user;
               if (this.user.id)
                  this.invoice.email = this.user.email;
               this.has_logged = false;
            })
         },
         err => {
            toast.msg = err;
            toast.title = "Error";
            this.toastyService.error(toast);
         }
      );
   }
   formatAmount(amount: number): string {
      return `PAGAR ${formatNumber(amount, this.locale, '1.2-2')} €`;
   }
   get_products(user_id?: number) {
      this.shoppingCarService.products(user_id).subscribe((products: any[]) => {
         this.items = products.map((product: any) => {
            product.precio = product.precio / 100;
            return product;
         });
         this.get_total();
      })
   }
   get_total() {
      this.total = 0;
      this.iva = 0;
      this.items.forEach((item: any) => {
         this.total += item.precio;
      })
      this.iva = (this.total * (0.21));
      this.invoice.items = this.items;
   }

   show_login() {
      this.has_logged = true;
   }
   show_register() {
      this.has_logged = false;
   }
   payment() {
      let toast: ToastOptions = this.toastOptionsClass.toastOptions,
         request: any;
      let invoice = Object.assign({}, this.invoice);
      if (this.user.id) {
         delete invoice.datosFacturacion;
      } else {
         invoice.cardData = this.cardForm.value;
         invoice.cardData["number"] = invoice.cardData["number"].replace(/\D+/g, '')
         delete this.invoice.card_id;
      }
      invoice.items = invoice.items.map((item: any) => {
         return {
            "ProductoId": item.id
         }
      })
      this.loading = true;
      if (this.user.id)
         this.invoicePaymentService.product_payment(invoice).pipe(
            takeUntil(this.ngUnsubscribe))
            .subscribe(res => {
               this.paymentSuccess();
               const user = this.sharedUserService.getUser();
               this.sharedUserService.setUserInfo(user, res.token);
               this.redirect(user.tipo);
            }, err => {
               this.loading = false;
               toast.msg = err;
               this.toastyService.error(toast);
            });
      else
         this.invoicePaymentService.no_user_payment(invoice).pipe(
            takeUntil(this.ngUnsubscribe))
            .subscribe(res => {
               this.paymentSuccess();
               this.sharedUserService.setUserInfo(res.user as IUsuarioStorage, res.token);
               this.redirect(res.user.tipo);
            }, err => {
               this.loading = false;
               toast.msg = err;
               this.toastyService.error(toast);
            });
   }
   paymentSuccess() {
      this.loading = false;
      this.shoppingCarService.clear();
      updateShoppingCarTrigger.next();
   }
   redirect(tipoUser: number) {

      if (tipoUser == 1)
         var queryParams = {
            msgS: "Dirígite a Mis compras para ver tus nuevas compras",
            msgTitle: "Compra exitosa",
            buttonTitle: "Mis compras",
            redirect: "/mis-abogados"
         };
      else
         var queryParams = {
            msgS: "Dirígite a Mis abogados para ver tus nuevas compras",
            msgTitle: "Compra exitosa",
            buttonTitle: "Mis abogados",
            redirect: "/mis-abogados"
         };

      this.router.navigate(["success", "true"], { relativeTo: this.route, queryParams });
   }
   validate() {
      let result = false;
      if (!this.user.id && !this.invoice.condition)
         result = true;
      if (!this.user.id && !this.invoice.email)
         result = true;
      if (!this.user.id && this.cardForm.invalid)
         result = true;

      if (this.user.id && !this.invoice.card_id)
         result = true;

      if (this.invoice.emisorEsEntidad && !this.isValidFacturacion)
         result = true
      return result;
   }


   login() {
      this.loading = true;
      this.userService.login(this.user.email, this.user.password).pipe(
         takeUntil(this.ngUnsubscribe)).subscribe(
            result => {
               this.user = result.user;
               if (this.user.id)
                  this.invoice.email = this.user.email;
               this.has_logged = false;
               this.sharedUserService.setUserInfo(result.user, result.token);
               this.loading = false;
            },
            err => {
               var toast: ToastOptions = this.toastOptionsClass.toastOptions;
               this.loading = false;
               toast.msg = err;
               this.toastyService.error(toast);
            });
   }

   changeCard(card_id: string) {
      this.invoice.card_id = card_id;
   }

   ngAfterViewInit() {
      this.onResize();
   }

   @HostListener("window:scroll", []) // for window scroll events
   onScroll() {
      if (this.profileNavHolder) {
         const navHolder = this.profileNavHolder.nativeElement.getBoundingClientRect();
         const footer = document.querySelector('footer').getBoundingClientRect();

         if (this.bottomNavContent > 0 && this.width > 767 && footer.top < this.bottomNavContent) {
            this.stickyBottom = true;
            this.sticky = false;
         } else if ((this.width < 768 && navHolder.top <= 130) || (this.width > 767 && navHolder.top <= (this.isNavLawyer ? 70 : 89))) {
            this.sticky = true;
            this.setBottomNavContent();
            this.stickyBottom = false;
         } else {
            this.sticky = false;
            this.stickyBottom = false;
         }
      } else {
         this.sticky = false;
         this.stickyBottom = false;
      }
   }

   @HostListener("window:resize", []) // for window resize events
   onResize() {
      this.isNavLawyer = document.querySelector("nav.topbar-abogado") ? true : false;
      this.setBottomNavContent();
      this.width = window.outerWidth;
      this.onScroll();
   }

   private setBottomNavContent(): void {
      const navContent = document.querySelector('.e4-invoice-resumen').getBoundingClientRect();
      this.bottomNavContent = navContent.top + navContent.height + 48;
   }

}