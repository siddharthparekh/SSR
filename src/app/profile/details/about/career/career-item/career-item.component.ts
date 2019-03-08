import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CareerItem } from "../../interfaces";

@Component({
  selector: "app-profile-career-item",
  templateUrl: "./career-item.component.html",
  styleUrls: ['./career-item.component.css']
})
export class CareerItemComponent {
   @Input() item: CareerItem;
   @Input() itIsMe: boolean;
   @Output() onClickEdit = new EventEmitter<CareerItem>();
   btnEditarVisible: boolean;

   editar() {
      this.onClickEdit.emit(this.item);
   }
}
