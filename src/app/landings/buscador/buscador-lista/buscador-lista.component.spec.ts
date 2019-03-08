import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { BuscadorListaComponent } from './buscador-lista.component'

describe('BuscadorListaComponent', () => {
    let component: BuscadorListaComponent
    let fixture: ComponentFixture<BuscadorListaComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BuscadorListaComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(BuscadorListaComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
