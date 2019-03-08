import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PaymentsService } from './../../../_services/payments.service';
import { SharedUserService } from './../../../_services/shared-user.service';
import { ToastOptionsClass } from './../../../_utils/toastOptionsClass';

declare var $: any;
@Component({
  selector: "app-card-settings",
  templateUrl: "./card-settings.component.html",
  styleUrls: ["./card-settings.component.css"]
})
export class CardSettingsComponent implements OnChanges {
  @Input() user: any;
  @Input() canDelete = true;
  cards: any[];
  cardForm: FormGroup;
  reqInProg = false;
  editing = false;

  @Output()
  onChangeCard = new EventEmitter();

  errorMsg = "";
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  card_id: string = "";
  public creditcardMask = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private sharedUserService: SharedUserService,
    private router: Router,
    private fb: FormBuilder,
    private paymentsService: PaymentsService
  ) {
    this.createForm();
    this.toastyConfig.theme = "default";
  }

  ngOnChanges() {
    if (this.user) this.getCards();
  }

  changeCard($event: any) {
    this.onChangeCard.emit(this.card_id);
  }

  getCards(adding: boolean = false) {
    this.paymentsService
      .getAllCards(this.user.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: any) => {
        this.cards = res.data;
        if (adding && this.cards.length > 0) {
          this.card_id = this.cards[this.cards.length - 1].id;
          this.onChangeCard.emit(this.card_id);
        }
      });
  }

  createForm() {
    this.cardForm = this.fb.group({
      number: ["", [Validators.pattern('[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}'), Validators.required]],
      cvc: ["", [Validators.pattern("[0-9]{3}"), Validators.required]],
      exp_month: [
        "",
        [
          Validators.pattern("[0-9]{1,2}"),
          Validators.required,
          Validators.min(1),
          Validators.max(12)
        ]
      ],
      exp_year: [
        "",
        [
          Validators.pattern("[0-9]{4}"),
          Validators.required,
          Validators.min(new Date().getFullYear()),
          Validators.max(3000)
        ]
      ]
    });
  }

  sendForm(value) {
    this.reqInProg = value;
    this.errorMsg = "";
    let cardForm = this.cardForm.value;
    cardForm['number'] = cardForm["number"].replace(/\D+/g, '')
    this.paymentsService
      .addCard(this.user.id, cardForm)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        res => {
          this.reqInProg = false;
          this.getCards(true);
          this.editing = false;
          var toast: ToastOptions = this.toastOptionsClass.toastOptions;
          toast.title = "COMPLETADO";
          toast.msg = "Tarjeta añadida";
          this.cardForm.reset();
          if (this.user) this.getCards();
          this.toastyService.success(toast);
        },
        err => {
          this.reqInProg = false;
          var toast: ToastOptions = this.toastOptionsClass.toastOptions;
          toast.msg = err;
          this.toastyService.error(toast);
          this.errorMsg =
            "Ha ocurrido un error al eliminar la tarjeta. Intente nuevamente";
        }
      );
  }

  deleteCard(i: number) {
    this.errorMsg = "";
    if (this.cards[i]) {
      this.reqInProg = true;
      this.paymentsService
        .deleteCard(this.user.id, this.cards[i].id)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          res => {
            this.reqInProg = false;
            this.getCards();
            var toast: ToastOptions = this.toastOptionsClass.toastOptions;
            toast.title = "COMPLETADO";
            toast.msg = "Tarjeta eliminada";
            this.toastyService.success(toast);
          },
          err => {
            this.reqInProg = false;
            var toast: ToastOptions = this.toastOptionsClass.toastOptions;
            toast.msg = err;
            this.toastyService.error(toast);
            this.errorMsg =
              "Ha ocurrido un error al eliminar la tarjeta. Intente nuevamente";
          }
        );
    }
  }
}
