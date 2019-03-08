import { Component, OnInit } from '@angular/core'
import { Output } from '@angular/core'
import { EventEmitter } from '@angular/core'
import { Input } from '@angular/core'

@Component({
    selector: 'app-entrar-gmail-boton',
    templateUrl: './entrar-gmail-boton.component.html',
    styleUrls: ['./entrar-gmail-boton.component.css'],
})
export class EntrarGmailBotonComponent implements OnInit {
    @Input() text = 'Entra con Gmail'
    @Output() emitClicked = new EventEmitter<void>()

    constructor() {}

    ngOnInit() {}

    public emitClick(): void {
        this.emitClicked.emit()
    }
}
