import { Component, OnInit } from '@angular/core'
import {
    IBuscadorListaLanding,
    BuscadorListaTipos,
} from '../../../_models/BuscadorListaLanding'
import { Input } from '@angular/core'

@Component({
    selector: 'app-buscador-lista-resultado',
    templateUrl: './buscador-lista-resultado.component.html',
    styleUrls: ['./buscador-lista-resultado.component.css'],
})
export class BuscadorListaResultadoComponent implements OnInit {
    @Input() searchResult: IBuscadorListaLanding
    @Input() term: string
    buscadorListaTipos = BuscadorListaTipos

    constructor() {}

    ngOnInit() {}
}
