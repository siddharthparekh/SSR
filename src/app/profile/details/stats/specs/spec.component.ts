import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Access, AccessLevel } from '../../../interfaces/profile-mode';
import { HeaderData, ContentData } from './interfaces';
import { SpecService } from './spec.service';
import { parseProfileMode } from '../../../utils/parse-profile-mode';


@Component({
   selector: 'app-profile-spec',
   templateUrl: './spec.component.html',
})
export class SpecComponent {
   @Input() headerData: HeaderData;
   isContentOpened = false;
   hasOpenedFirst = false;
   hasError = false;
   @Input() access: Access;
   @Input() specialities = false;

   contentData: ContentData;

   constructor(
      private specService: SpecService,
      private route: ActivatedRoute,
   ) { }

   onContentToggle(isOpened: boolean) {
      this.isContentOpened = isOpened;
      if (isOpened && !this.hasOpenedFirst) {
         this.hasOpenedFirst = true;
         this.onInitialOpen();
      }
   }

   onInitialOpen() {
      const profileMode = parseProfileMode(this.route);
      this.specService.getSpecContent(
         profileMode.identifier, this.headerData.id, this.access
      ).subscribe(
         x => {
            this.contentData = x;
         },
         err => {
            console.error(err);
            this.hasError = true;
         }
      );
   }
}
