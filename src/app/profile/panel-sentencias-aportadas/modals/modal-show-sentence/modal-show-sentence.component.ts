import { takeUntil } from "rxjs/operators";
import {
   Component,
   OnInit,
   Input,
   OnChanges
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SentenceService } from "./../../../../_services/sentence.service";
import { Subject } from "rxjs";
import { ISentencia, Sentencia } from "./../../../../_models/Sentencia";
import { ToastOptionsClass } from "../../../../_utils/toastOptionsClass";
import { ToastyService, ToastyConfig, ToastOptions } from "ng2-toasty";
import { UserService } from "../../../../_services/user.service";
import { SharedUserService } from "../../../../_services/shared-user.service";

declare var $: any;

@Component({
   selector: "app-modal-show-sentence",
   templateUrl: "./modal-show-sentence.component.html",
   styleUrls: ["./modal-show-sentence.component.css"]
})
export class ModalShowSentenceComponent implements OnChanges {
   sentence: ISentencia = {} as ISentencia;
   ngUnsubscribe: Subject<void> = new Subject<void>();
   reqInProg = false;
   editing = false;
   suggestion: string = "";
   errorMsg: string = "";
   @Input() sentenceId: number;

   constructor(
      private route: ActivatedRoute,
      private sentenceService: SentenceService,
      private toastOptionsClass: ToastOptionsClass,
      private toastyService: ToastyService,
      private toastyConfig: ToastyConfig,
      private router: Router,
      private userService: UserService,
      private sharedUserService: SharedUserService
   ) {
      this.toastyConfig.theme = "default";
   }

   ngOnChanges() {
      console.log(this.sentenceId);
      if (this.sentenceId) {
         this.reqInProg = true;
         this.sentenceService.getDetailSentence(this.sentenceId).subscribe(sentence => {
            this.sentence = sentence;
            if (!this.sentence) throw new Error("Sentencia no disponible");
            this.sentence.Fallos.forEach(fallo => {
               fallo["parteDemandante"] = fallo.Partes.filter(
                  parte =>
                     parte.PosicionProcesal.nombre.toLocaleLowerCase() == "demandante"
               );
               fallo["parteDemandada"] = fallo.Partes.filter(
                  parte =>
                     parte.PosicionProcesal.nombre.toLocaleLowerCase() == "demandado"
               );
            });
            this.reqInProg = false;
         }, err => {
            console.log(err);
            this.reqInProg = false;
         });
      }
   }
   ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
   }

   onSendSuggestion(value) {
      this.errorMsg = "";
      if (this.suggestion && this.sentenceId) {
         this.reqInProg = true;
         this.reqInProg = value;
         this.userService
            .sendSuggestion(
               this.suggestion,
               this.sharedUserService.getUserId(),
               this.sentence.ecli
            )
            .subscribe(
               res => {
                  this.reqInProg = false;
                  $("#show-sentence").modal("hide");
                  var toast: ToastOptions = this.toastOptionsClass.toastOptions;
                  toast.title = "Éxito"
                  toast.msg = "Sugerencia enviada";
                  this.toastyService.success(toast);
                  this.router.navigate(["../../"], { relativeTo: this.route });
               },
               err => {
                  var toast: ToastOptions = this.toastOptionsClass.toastOptions;
                  toast.msg = err;
                  this.toastyService.error(toast);
                  this.reqInProg = false;
               }
            );
      }
   }
}
