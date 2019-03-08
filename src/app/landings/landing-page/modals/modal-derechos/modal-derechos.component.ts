
import {takeUntil} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { IDerecho } from "../../../../_models/Derecho";
import { RightService } from '../../../../_services/right.service';
import { Subject } from 'rxjs';

import { Router } from '@angular/router';
import * as moment from 'moment';
import { SharedUserService } from './../../../../_services/shared-user.service';


@Component({
  selector: 'app-modal-derechos',
  templateUrl: './modal-derechos.component.html',
  styleUrls: ['./modal-derechos.component.css'],
  providers: [RightService]
})
export class ModalDerechosComponent implements OnInit {

  derechos: Array<IDerecho> = [];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private rightService: RightService,
    private router: Router,
    private sharedUserService: SharedUserService
  ) { }

  ngOnInit() {
    this.rightService.findDerechos().pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe(derechos => {
        this.derechos = derechos;
      });
  }
  goToDerecho(derecho: IDerecho) {
    const d = this.sharedUserService.formatUrlString(derecho.nombre);
    this.router.navigate(['/derecho', d]);
  }

}
