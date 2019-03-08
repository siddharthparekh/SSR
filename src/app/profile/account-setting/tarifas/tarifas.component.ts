import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SharedUserService } from '../../../_services/shared-user.service';
import { ICategoria } from './../../../_models/RespuestaLegal';
import { LegalResponseService } from './../../../_services/legal-response.service';
import { MetaFrontService } from './../../../_services/meta-front.service';
import { ProfesionalService } from './../../../_services/profesional.service';
import { ToastOptionsClass } from './../../../_utils/toastOptionsClass';

@Component({
  selector: "app-tarifas",
  templateUrl: "./tarifas.component.html",
  styleUrls: ["./tarifas.component.css"],
  providers: [ProfesionalService, LegalResponseService, MetaFrontService]
})
export class TarifasComponent implements OnInit, OnDestroy {
  formulario: any;
  categorias: ICategoria[];
  user: any;
  shouldGoTutorial: boolean;
  skipTarifas = false;
  ngUnsubscribe = new Subject<void>();
  onSubmitTarifas = new Subject<void>();

  constructor(
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private router: Router,
    private route: ActivatedRoute,
    private legalResponseService: LegalResponseService,
    private profesionalService: ProfesionalService,
    private metaFrontService: MetaFrontService,
    private sharedUserService: SharedUserService
  ) {
    this.toastyConfig.theme = "default";
  }

  ngOnInit() {
    this.shouldGoTutorial =
      this.route.snapshot.queryParams["t"] === "0" ? false : true;
    this.legalResponseService
      .getCategorias()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(categorias => {
        this.categorias = categorias.map(c => {
          c.nombre = c.nombre.replace("_", " ");
          return c;
        });
      });
    this.user = this.sharedUserService.getUser();
  }

  omitir() {
    this.router.navigate(
      this.sharedUserService.getProfileUrl(this.user, false),
      { queryParams: this.shouldGoTutorial ? { tutorial: true } : null }
    );
  }

  onUpdateTarifasFinish(err) {
    if (err) {
      var toast: ToastOptions = this.toastOptionsClass.toastOptions;
      toast.title = "ERROR";
      toast.msg = err;
      this.toastyService.error(toast);
    } else this.goProfile();
  }

  goProfile() {
    setTimeout(
      () =>
        this.router.navigate(
          this.sharedUserService.getProfileUrl(this.user, false),
          { queryParams: this.shouldGoTutorial ? { tutorial: true } : null }
        ),
      1500
    );
  }

  saveNoVolverMostrar() {
    this.skipTarifas = !this.skipTarifas;
    this.metaFrontService
      .skipTarifas(this.skipTarifas)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
