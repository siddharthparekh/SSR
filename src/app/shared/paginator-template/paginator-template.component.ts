import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator-template',
  templateUrl: './paginator-template.component.html',
  styleUrls: ['./paginator-template.component.css']
})
export class PaginatorTemplateComponent implements OnInit {

  @Input() pag: any;

  constructor() { }

  ngOnInit() {
  }

}
