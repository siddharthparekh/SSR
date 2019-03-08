import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { EntrarGmailBotonComponent } from './entrar-gmail-boton.component'

describe('EntrarGmailBotonComponent', () => {
    let component: EntrarGmailBotonComponent
    let fixture: ComponentFixture<EntrarGmailBotonComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EntrarGmailBotonComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(EntrarGmailBotonComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
