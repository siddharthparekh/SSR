import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { IOption } from 'ng-select';

@Component({
  selector: 'app-filtro-dialog',
  templateUrl: './filtro.dialog.component.html',
  styleUrls: ['./filtro.dialog.component.css'],
  providers: []
})
export class FiltroDialogComponent {
  @Input() terminoBuscado: string;
  @Input() derechos: Array<IOption> = [];
  @Input() filtersFromUrl: any;
  @Output() filterAppliedEmitter: EventEmitter<any> = new EventEmitter();
  @Input() isRanking: boolean = false;

  applyFilter($event: any) {
    this.filterAppliedEmitter.next($event);
  }
}
