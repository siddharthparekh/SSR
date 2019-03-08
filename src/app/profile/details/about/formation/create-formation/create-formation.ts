import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormationItem } from '../../interfaces';
import { Subject } from 'rxjs';

@Component({
   selector: 'app-create-formation',
   templateUrl: './create-formation.component.html',
})


export class CreateFormation {
   @Input() reqInProg = false;
   @Output() onCreateFormation = new EventEmitter<FormationItem>();
   @Input() resetForm: Subject<void>;

   isValid = false;
   form: FormationItem;

   newEducation() {
      if (this.isValid) this.onCreateFormation.emit(this.form);
   }
   closeModal() {
      this.resetForm.next();
   }
}
