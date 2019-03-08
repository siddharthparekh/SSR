import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';
import { PaginationInstance } from 'ngx-pagination';

import { ISentencia } from './../../_models/Sentencia';
import { SentenceService } from './../../_services/sentence.service';
import { SharedUserService } from './../../_services/shared-user.service';
import { ToastOptionsClass } from './../../_utils/toastOptionsClass';
import { Subject, Observable } from 'rxjs';
import { takeUntil, tap, map } from 'rxjs/operators';

@Component({
   selector: "app-panel-sentencias-aportadas",
   templateUrl: "./panel-sentencias-aportadas.component.html",
   styleUrls: ["./panel-sentencias-aportadas.component.css"]
})
export class PanelSentenciasAportadasComponent implements OnInit {
   sentences: Observable<ISentencia[]>;
   @Input() inputSenteces: Observable<ISentencia[]>;
   sentenceIdSelected: number;
   pagesDisplay = 6;
   reqInProg = false;


   public config: PaginationInstance = {
      id: "custom",
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 0
   };

   constructor(
      private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
      private toastyConfig: ToastyConfig,
      private sentenceService: SentenceService,
      private title: Title,
      private sharedUserService: SharedUserService
   ) {
      this.toastyConfig.theme = "default";
   }

   ngOnInit() {
      this.title.setTitle("Resoluciones Indexadas");
      this.getSententes();
   }
   getSententes() {
      if (!this.inputSenteces)
         this.sentences = this.fetchSentences();
      else this.sentences = this.inputSenteces;
   }

   onSelectedSentence(sentence) {
      this.sentenceIdSelected = sentence.id;
   }
   onPageChange(page: number) {
      this.sentences = Observable.of([]);
      this.config.currentPage = page;
      this.getSententes();
   }
   fetchSentences() {
      this.reqInProg = true;
      return this.sentenceService.getSentences(null, this.config)
         .pipe(
            tap(
               data => {
                  this.config.totalItems = data.total;
               },
               err => {
                  var toast: ToastOptions = this.toastOptionsClass.toastOptions;
                  toast.msg = err;
                  this.toastyService.error(toast);
               }
            ),
            map(data => data.resoluciones),
            tap(() => this.reqInProg = false)
         );
   }
   ngOnDestroy() {
   }
}
