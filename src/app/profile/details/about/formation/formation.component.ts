import { Component, Input } from '@angular/core';

import { FormationItem } from '../interfaces';
import { ProfesionalService } from '../../../../_services/profesional.service';
import { ToastOptions, ToastyService } from 'ng2-toasty';
import { ToastOptionsClass } from '../../../../_utils/toastOptionsClass';
import { Subject } from 'rxjs';

@Component({
   selector: 'app-profile-formation',
   templateUrl: './formation.component.html',
})
export class FormationComponent {
   @Input() items: FormationItem[];
   @Input() itIsMe:boolean;
   reqInProg = false;
   resetForm = new Subject<void>();
   onSelectItem = new Subject<FormationItem>();

   constructor(
      private profesionalService: ProfesionalService,
      private toastService: ToastyService,
      private toastOptionsClass: ToastOptionsClass,
   ) {

   }
   newFormation(form: FormationItem) {
      this.reqInProg = true;
      this.profesionalService
         .createEducation(form)
         .subscribe(() => {
            this.items.push(form);
            //@ts-ignore
            $("#new-education").modal("hide");
            this.reqInProg = false;
         },
            err => {
               this.resetForm.next();
               this.reqInProg = false;
               //@ts-ignore
               $("#new-education").modal("hide");
               var toast: ToastOptions = this.toastOptionsClass.toastOptions;
               toast.msg = err;
               this.toastService.error(toast);
            }
         );
   }
   editFormation(form: FormationItem) {
      this.reqInProg = true;
      this.profesionalService.updateEducation(form).subscribe(
         () => {
            //@ts-ignore
            $("#edit-education").modal("hide");
            this.updateItemInMemory(form);
            this.reqInProg = false;
         }, err => {
            //@ts-ignore
            $("#edit-education").modal("hide");
            var toast: ToastOptions = this.toastOptionsClass.toastOptions;
            toast.msg = err;
            this.toastService.error(toast);
            this.reqInProg = false;
         }
      );
   }
   selectItem(item) {
      this.onSelectItem.next(item);
   }
   updateItemInMemory(form: FormationItem) {
      const i = this.items.findIndex(item => item.id == form.id);
      if (i < 0) throw new Error("No se encontro la formación ya actualizada");
      this.items[i] = form;
   }
}
