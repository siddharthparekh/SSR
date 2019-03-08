import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { Input } from '@angular/core'

@Component({
    selector: 'app-empty-search',
    templateUrl: './empty-search.component.html',
    styleUrls: ['./empty-search.component.css'],
})
export class EmptySearchComponent implements OnInit {
    @Input() message: string
    @Output() clickedGoBack = new EventEmitter<void>()

    constructor() {}

    ngOnInit() {}

    public _clickedGoBack(e): void {
        e.stopPropagation()
        this.clickedGoBack.next()
    }
}
