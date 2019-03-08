import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { CareerItem } from '../../interfaces';
import { Subject } from 'rxjs';

@Component({
   selector: 'app-edit-career',
   templateUrl: './edit-career.component.html',
})
export class EditCareerComponent implements OnChanges {
   @Input() item: CareerItem;
   @Input() reqInProg = false;
   @Input() onSelectItem: Subject<CareerItem>;
   @Output() onEditCareer = new EventEmitter<CareerItem>();
   isValid = false;
   originalItem: CareerItem;

   editExperiencia() {
      if (this.isValid) this.onEditCareer.emit(this.item);
   }
   ngOnChanges() {
      this.originalItem = this.item;
   }
}
