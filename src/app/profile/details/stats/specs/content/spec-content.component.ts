import { Component, Input, OnInit } from '@angular/core';

import { ContentData } from '../interfaces';
import { Access, AccessMode, AccessLevel } from '../../../../interfaces/profile-mode';

declare const $: any;

@Component({
  selector: 'app-profile-spec-content',
  templateUrl: './spec-content.component.html',
  styleUrls: [
    '../../../../styles/blockable.css',
  ],
})
export class SpecContentComponent implements OnInit {
  @Input() data: ContentData;
  @Input() access: Access;
  blocked = false;

  ngOnInit() {
    const access = this.access;
    if (!!access && access.mode === AccessMode.Directory) {
      if (access.level < AccessLevel.Advanced) {
        this.data.subjectsData = [];
        this.blocked = true;
      }
    }
  }

  public buyProfile() {
    if (this.blocked) {
      if (this.access.mode === AccessMode.Ranking) {
        setTimeout(
          () => $("#modal-specilist-contract-plans")["modal"]("show"),
          200
        );
      }
      if (this.access.mode === AccessMode.Directory) {
        setTimeout(
          () => $("#modal-profile-contract-plans")["modal"]("show"),
          200
        );
      }
    }
  }
}
