import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-irj-indicator",
  templateUrl: "./irj-indicator.component.html",
  styleUrls: [
    "./irj-indicator.component.css",
    "./irj-indicator.min.css",
    "../styles/blockable.css"
  ]
})
export class IrjIndicatorComponent implements OnInit {
  @Input() widthAuto = false;
  @Input() value = 0;
  displayedValue: number;
  @Input() blocked = false;

  ngOnInit() {
    if (!!this.blocked) {
      this.displayedValue = 0;
    } else {
       if(this.value > 100) this.value = 100;
      this.displayedValue = Number((this.value || 0).toFixed());
    }
  }

  onQuestionClick($event) {
    $event.preventDefault();
  }
}
