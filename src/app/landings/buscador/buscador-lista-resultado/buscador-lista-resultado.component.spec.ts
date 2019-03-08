import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { BuscadorListaResultadoComponent } from './buscador-lista-resultado.component'

describe('BuscadorListaResultadoComponent', () => {
    let component: BuscadorListaResultadoComponent
    let fixture: ComponentFixture<BuscadorListaResultadoComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BuscadorListaResultadoComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(BuscadorListaResultadoComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
