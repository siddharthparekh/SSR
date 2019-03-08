import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CareerItem } from '../../interfaces';
import { Subject } from 'rxjs';

@Component({
   selector: 'app-create-career',
   templateUrl: './create-career.component.html',
})
export class CreateCareerComponent {
   @Input() reqInProg = false;
   @Output() onCreateFormation = new EventEmitter<CareerItem>();
   @Input() resetForm: Subject<void>;

   isValid = false;
   form: CareerItem;

   newCareer() {
      if (this.isValid) this.onCreateFormation.emit(this.form);
   }
   closeModal() {
      this.resetForm.next();
   }
}
