import { Component, Input, EventEmitter, Output } from '@angular/core';

import { FormationItem } from '../../interfaces';

@Component({
   selector: 'app-profile-formation-item',
   templateUrl: './formation-item.component.html',
})
export class FormationItemComponent {
   @Input() item: FormationItem;
   @Input() itIsMe: boolean;
   @Output() onClickEdit = new EventEmitter<FormationItem>();
   btnEditarVisible: boolean

   editar() {
      this.onClickEdit.emit(this.item);
   }
}
