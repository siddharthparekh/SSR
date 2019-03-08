import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: "app-empty-pagos",
  templateUrl: "./empty-pagos.component.html",
  styleUrls: ["./empty-pagos.component.css"]
})
export class EmptyPagosComponent implements OnInit {
  @Output() clickedButton = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  public _clickedButton(e): void {
    e.stopPropagation();
    this.clickedButton.next();
  }
}
