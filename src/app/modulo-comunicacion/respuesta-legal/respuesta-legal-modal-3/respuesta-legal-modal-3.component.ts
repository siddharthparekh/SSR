import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToastyConfig, ToastyService } from 'ng2-toasty';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LegalResponseService } from './../../../_services/legal-response.service';
import { MessengerService } from './../../../_services/messenger.service';
import { SharedUserService } from './../../../_services/shared-user.service';
import { ToastOptionsClass } from './../../../_utils/toastOptionsClass';
import { SharedModalResponseService } from './../../_services/shared-modal-response.service';

@Component({
  selector: "app-respuesta-legal-modal-3",
  templateUrl: "./respuesta-legal-modal-3.component.html",
  styleUrls: ["./respuesta-legal-modal-3.component.css"],
  providers: []
})
export class RespuestaLegalModal3Component implements OnInit, OnDestroy {
  @Input() reqInProg = false;
  isUploaded: boolean = false;
  nombre: string;
  routeSnapshot: ActivatedRouteSnapshot;
  ngUnsubscribe = new Subject<void>();
  uploadInfo: { progress: number; msgId: number };

  constructor(
    private sharedService: SharedModalResponseService,
    private route: ActivatedRoute,
    private sharedUserService: SharedUserService,
    private router: Router,
    private toastOptionsClass: ToastOptionsClass,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private messengerService: MessengerService,
    private legalResponseService: LegalResponseService
  ) {
    this.toastyConfig.theme = "default";
    this.routeSnapshot = this.route.snapshot;
  }

  ngOnInit() {
    this.messengerService
      .onProgressFile()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(uploadInfo => (this.uploadInfo = uploadInfo));
  }

  selectFile = (f: File) => {
    this.nombre = f.name;
    this.isUploaded = true;
    this.sharedService.setPresupuesto(f);
  };
  deselectFile = () => {
    this.sharedService.setPresupuesto(undefined);
    this.nombre = undefined;
    this.isUploaded = false;
  };
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
