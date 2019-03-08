import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: "app-button-loader",
  templateUrl: "./button-loader.component.html",
  styleUrls: ["./button-loader.component.css"]
})
export class ButtonLoaderComponent implements OnInit {
  @Input() parentHeight = false;
  @Input() extend = false;
  @Input() type = 'button'
  @Input() disabled = false;
  @Input() strong = true;
  @Input() showLoading = false;
  @Input() text = "Text Label";
  @Input() float = null;
  @Output() emitClicked = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {
  }

  public emitClick(): void {
    this.emitClicked.emit(true);
  }
}
