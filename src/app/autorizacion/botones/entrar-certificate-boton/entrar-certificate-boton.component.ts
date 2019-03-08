import { Component, OnInit, Input } from '@angular/core'
import { Output } from '@angular/core'
import { EventEmitter } from '@angular/core'

@Component({
    selector: 'app-entrar-certificate-boton',
    templateUrl: './entrar-certificate-boton.component.html',
    styleUrls: ['./entrar-certificate-boton.component.css'],
})
export class EntrarCertificateBotonComponent implements OnInit {
    @Output() emitClicked = new EventEmitter<void>()
    @Input() disabled = false;

    constructor() {}

    ngOnInit() {}

    public emitClick(): void {
        this.emitClicked.emit()
    }
}
