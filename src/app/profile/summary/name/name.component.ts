import { Component, Input, OnInit } from '@angular/core';
import { NameData } from '../interfaces';
import { AccessMode, AccessLevel, Access } from '../../interfaces/profile-mode';
import { testFullName, testCollege } from '../test-data';

declare const $: any;

@Component({
  selector: 'app-profile-summary-name',
  templateUrl: './name.component.html',
  styleUrls: [
    './name.component.css',
    '../../styles/blockable.css',
  ],
})
export class NameComponent implements OnInit {
  @Input() data: NameData;
  @Input() access: Access;
  @Input() sticky = false;
  toolTipsMsg = '';
  blocked = false;

  ngOnInit() {
    if (this.access && this.access.mode === AccessMode.Ranking) {
      if (this.access.level < AccessLevel.Advanced) {
        this.blocked = true;
      }
    }
    this.initTooltip();
  }

  initTooltip() {
    $(function () {
      $('#badgeToolTip')['tooltip']()
    })
  }

  plan() {
    if (this.blocked) {
      setTimeout(
        () => $("#modal-specilist-contract-plans")["modal"]("show"),
        200
      );
    }
  }
}
