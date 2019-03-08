import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { FormationItem } from '../../interfaces';
import { Subject } from 'rxjs';

@Component({
   selector: 'app-edit-formation',
   templateUrl: './edit-formation.component.html',
})
export class EditFormation implements OnInit {
   @Input() item: FormationItem;
   @Input() reqInProg = false;
   @Input() onSelectItem: Subject<FormationItem>;
   @Output() onEditFormation = new EventEmitter<FormationItem>();
   isValid = false;
   originalItem: FormationItem;

   editEducacion() {
      if (this.isValid) this.onEditFormation.emit(this.item);
   }
   ngOnInit() {
      this.originalItem = this.item;
   }
}
