import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: "app-error-input",
  templateUrl: "./error-input.component.html",
  styleUrls: ["./error-input.component.css"]
})
export class ErrorInputComponent implements OnInit {
  @Input() msg = "Datos incorrectos";

  constructor() {}

  ngOnInit() {}
}
