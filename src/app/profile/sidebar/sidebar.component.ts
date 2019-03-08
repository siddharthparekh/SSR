import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalsService } from './../../_services/modals.service';
import { UserService } from '../../_services/user.service';
declare var $: any;
import { Subject ,  Observable } from 'rxjs';
import { IProfesional } from './../../_models/Profesional';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  @Input() user: IProfesional;
  @Input() hasPermission: boolean;
  @Input() isLoggedIn: boolean;
  @Input() showFoto: boolean;
  modalRef: BsModalRef;
  private s: any;


  constructor(private userService: UserService, private modalService: BsModalService, private modalSharedService: ModalsService) {
  }

  ngOnInit() {

  }
}
