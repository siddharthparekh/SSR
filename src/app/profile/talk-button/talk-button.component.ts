import { Component, Input, OnChanges } from '@angular/core';

import { Access, AccessMode, AccessLevel, ProfileMode } from '../interfaces/profile-mode';
import { SharedUserService } from '../../_services/shared-user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { decode } from '@angular/router/src/url_tree';

@Component({
   selector: 'app-profile-talk-button',
   templateUrl: './talk-button.component.html',
   styleUrls: ['./talk-button.component.css']
})
export class TalkButtonComponent implements OnChanges {
   @Input() access: Access;
   @Input() mode: ProfileMode;
   @Input() isRegistered: boolean = true;
   @Input() hasQueries = false;
   isRanking = false;
   itIsMe: boolean;
   accessOwner = AccessLevel.Owner;

   constructor(
      private sharedUserService: SharedUserService,
      private router: Router
   ) { }

   ngOnChanges() {
      const access = this.access;
      if (access && access.mode === AccessMode.Ranking) {
         this.isRanking = true;
      }
      if (this.mode) this.itIsMe = this._itIsMe(this.mode);
   }
   buyProfile() {
      setTimeout(
         () => $("#modal-specilist-contract-plans")["modal"]("show"),
         200
      );
   }
   startConversation() {
      if (!this.sharedUserService.isLoggedIn()) {
         let url = this.router.url;
         url = url.replace("abogado-int", "abogado"); //hack por el tema del componente refresh de la url
         this.router.navigate(["/auth/login"], { queryParams: { redirect: encodeURI(url) } });
      }
      setTimeout(
         () => $("#modal-contacto-abogado")["modal"]("show"),
         200
      );
   }
   private _itIsMe(mode: ProfileMode) {
      const userId = this.sharedUserService.getUserId();
      if (mode.accessMode == AccessMode.Directory && mode.identifier == userId)
         return true;
      else
         return false;
   }
}
